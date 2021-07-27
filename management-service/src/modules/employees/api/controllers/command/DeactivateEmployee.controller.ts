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
  DeactivateEmployeeCommand,
  DeactivateEmployeeErrors,
  DeactivateEmployeeResponse,
} from '../../../application/command/deactivateEmployee';
import { EmployeeIsAlreadyInactiveGuard } from '../../../application/guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class DeactivateEmployeeController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.EmployeesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Patch('enterprises/:enterpriseId/employees/:employeeId/deactivate')
  @ApiTags('Employees')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  @ApiMethodNotAllowedResponse({ description: 'Employee is already inactive' })
  async deactivateEmployee(
    @Param('enterpriseId') enterpriseId: string,
    @Param('employeeId') employeeId: string,
    @Res() res: Response,
  ) {
    try {
      const result: DeactivateEmployeeResponse = await this.commandBus.execute(
        new DeactivateEmployeeCommand(enterpriseId, employeeId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case DeactivateEmployeeErrors.EmployeeNotFoundError:
          case DeactivateEmployeeErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          case EmployeeIsAlreadyInactiveGuard:
            return this.methodNotAllowed(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Employee was successfully deactivated');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
