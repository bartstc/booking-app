import { Controller, Get, Logger, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { EmployeeDto } from 'modules/facilities/application/dto';
import {
  GetEmployeesQuery,
  GetEmployeesResponse,
  GetEmployeesErrors,
} from 'modules/facilities/application/query/getEmployees';
import { EmployeeCollectionQueryParams } from '../../../adapter/params';
import { EmployeeStatus } from '../../../domain/types';

@Controller()
export class GetEmployeesController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  private logger = new Logger('GetEmployeesController');

  @Get('facilities/:facilityId/employees')
  @ApiTags('Employees')
  @ApiOkResponse({ type: EmployeeDto, isArray: true })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'query', type: 'string', required: false })
  @ApiQuery({ name: 'status', enum: EmployeeStatus, required: false })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getEmployees(
    @Param('facilityId') facilityId: string,
    @Query() params: EmployeeCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const result: GetEmployeesResponse = await this.queryBus.execute(
        new GetEmployeesQuery(facilityId, params),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEmployeesErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Employees successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
