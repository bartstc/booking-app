import { CommandBus } from '@nestjs/cqrs';
import { Controller, Inject, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import {
  ActivateEmployeeCommand,
  ActivateEmployeeErrors,
  ActivateEmployeeResponse,
} from 'modules/facilities/application/command/activateEmployee';
import { EmployeeIsAlreadyActiveGuard } from '../../../application/guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class ActivateEmployeeController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

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

      this.logger.log('Employee was successfully activated');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
