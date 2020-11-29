import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { EmployeeService } from '../../services';
import { RemoveEmployeeResponse } from './removeEmployee.case';
import { RemoveEmployeeErrors } from './removeEmployee.errors';

@Controller()
export class RemoveEmployeeController extends BaseController {
  constructor(private readonly service: EmployeeService) {
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
      const result: RemoveEmployeeResponse = await this.service.removeEmployee({
        facilityId,
        employeeId,
      });

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
