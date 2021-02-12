import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { EmployeeDto } from 'modules/facilities/application/dto';
import {
  GetEmployeeResponse,
  GetEmployeeQuery,
  GetEmployeeErrors,
} from 'modules/facilities/application/query/getEmployee';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetEmployeeController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('facilities/:facilityId/employees/:employeeId')
  @ApiTags('Employees')
  @ApiOkResponse({ type: EmployeeDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  async getEmployee(
    @Param('employeeId') employeeId: string,
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetEmployeeResponse = await this.queryBus.execute(
        new GetEmployeeQuery(employeeId, facilityId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEmployeeErrors.EmployeeDoesNotExistError:
          case GetEmployeeErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Employee successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
