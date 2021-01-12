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

import {
  DeactivateEmployeeCommand,
  DeactivateEmployeeErrors,
  DeactivateEmployeeResponse,
} from 'modules/facilities/application/command/deactivateEmployee';
import { EmployeeIsAlreadyInactiveGuard } from '../../../application/guards';

@Controller()
export class DeactivateEmployeeController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('DeactivateEmployeeController');

  @Patch('facilities/:facilityId/employees/:employeeId/deactivate')
  @ApiTags('Employees')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  @ApiMethodNotAllowedResponse({ description: 'Employee is already inactive' })
  async deactivateEmployee(
    @Param('facilityId') facilityId: string,
    @Param('employeeId') employeeId: string,
    @Res() res: Response,
  ) {
    try {
      const result: DeactivateEmployeeResponse = await this.commandBus.execute(
        new DeactivateEmployeeCommand(facilityId, employeeId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case DeactivateEmployeeErrors.EmployeeNotFoundError:
          case DeactivateEmployeeErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          case EmployeeIsAlreadyInactiveGuard:
            return this.methodNotAllowed(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Employee was successfully deactivated');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
