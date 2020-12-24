import { CommandBus } from '@nestjs/cqrs';
import { Controller, Logger, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import { ActivateEmployeeResponse } from './ActivateEmployee.handler';
import { ActivateEmployeeErrors } from './ActivateEmployee.errors';
import { ActivateEmployeeCommand } from './ActivateEmployee.command';
import { EmployeeIsAlreadyActiveGuard } from '../../../domain/guards';

@Controller()
export class ActivateEmployeeController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('ActivateEmployeeController');

  @Patch('facilities/:facilityId/employees/:employeeId/activate')
  @ApiTags('Employees')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  @ApiMethodNotAllowedResponse({ description: 'Employee is already active' })
  async activateEmployee(
    @Param('facilityId') facilityId: string,
    @Param('employeeId') employeeId: string,
    @Res() res: Response,
  ) {
    try {
      const result: ActivateEmployeeResponse = await this.commandBus.execute(
        new ActivateEmployeeCommand(facilityId, employeeId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case ActivateEmployeeErrors.EmployeeNotFoundError:
          case ActivateEmployeeErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          case EmployeeIsAlreadyActiveGuard:
            return this.methodNotAllowed(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Employee was successfully activated');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
