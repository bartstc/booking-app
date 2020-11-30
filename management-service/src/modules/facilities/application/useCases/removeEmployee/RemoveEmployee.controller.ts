import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { RemoveEmployeeResponse } from './RemoveEmployee.handler';
import { RemoveEmployeeErrors } from './RemoveEmployee.errors';
import { RemoveEmployeeCommand } from './RemoveEmployee.command';

@Controller()
export class RemoveEmployeeController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('RemoveEmployeeController');

  @Delete('facilities/:facilityId/employees/:employeeId')
  async removeEmployee(
    @Param('facilityId') facilityId: string,
    @Param('employeeId') employeeId: string,
    @Res() res: Response,
  ) {
    try {
      const result: RemoveEmployeeResponse = await this.commandBus.execute(
        new RemoveEmployeeCommand(facilityId, employeeId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case RemoveEmployeeErrors.EmployeeNotFoundError:
          case RemoveEmployeeErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Employee successfully removed');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
