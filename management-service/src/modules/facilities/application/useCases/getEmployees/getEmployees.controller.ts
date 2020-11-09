import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';
import {GetEmployeesCase} from "./getEmployees.case";

@Controller()
export class GetEmployeesController extends BaseController {
  constructor(private readonly getEmployeesCase: GetEmployeesCase) {
    super();
  }

  private logger = new Logger('GetEmployeesController');

  @Get('facilities/:facilityId/employees')
  async getEmployees(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.getEmployeesCase.execute(facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Employees successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
