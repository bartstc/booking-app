import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { GetEmployeeCase } from './getEmployee.case';
import { GetEmployeeErrors } from './getEmployee.errors';

@Controller()
export class GetEmployeeController extends BaseController {
  constructor(private readonly getEmployeeCase: GetEmployeeCase) {
    super();
  }

  private logger = new Logger('GetEmployeeController');

  @Get('facilities/:facilityId/employees/:employeeId')
  async getEmployees(
    @Param('employeeId') employeeId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.getEmployeeCase.execute(employeeId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetEmployeeErrors.EmployeeDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Employee successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
