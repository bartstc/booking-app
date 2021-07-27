import { Controller, Delete, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import {
  RemoveEmployeeCommand,
  RemoveEmployeeErrors,
  RemoveEmployeeResponse,
} from '../../../application/command/removeEmployee';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class RemoveEmployeeController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.EmployeesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Delete('enterprises/:enterpriseId/employees/:employeeId')
  @ApiTags('Employees')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  async removeEmployee(
    @Param('enterpriseId') enterpriseId: string,
    @Param('employeeId') employeeId: string,
    @Res() res: Response,
  ) {
    try {
      const result: RemoveEmployeeResponse = await this.commandBus.execute(
        new RemoveEmployeeCommand(enterpriseId, employeeId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case RemoveEmployeeErrors.EmployeeNotFoundError:
          case RemoveEmployeeErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Employee successfully removed');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
