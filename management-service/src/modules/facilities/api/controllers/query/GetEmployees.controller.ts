import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { EmployeeDto } from 'modules/facilities/application/dto';
import {
  GetEmployeesQuery,
  GetEmployeesResponse,
  GetEmployeesErrors,
} from 'modules/facilities/application/query/getEmployees';

@Controller()
export class GetEmployeesController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  private logger = new Logger('GetEmployeesController');

  @Get('facilities/:facilityId/employees')
  @ApiTags('Employees')
  @ApiOkResponse({ type: EmployeeDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getEmployees(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetEmployeesResponse = await this.queryBus.execute(
        new GetEmployeesQuery(facilityId),
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
