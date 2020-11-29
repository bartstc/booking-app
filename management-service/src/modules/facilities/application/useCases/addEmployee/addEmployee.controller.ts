import { Body, Controller, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController, ValidationTransformer } from 'shared/core';

import { EmployeeService } from '../../services';
import { AddEmployeeDto } from './addEmployee.dto';
import { AddEmployeeResponse } from './addEmployee.case';
import { AddEmployeeErrors } from './addEmployee.errors';
import { addEmployeeSchema } from './addEmployee.schema';

@Controller()
export class AddEmployeeController extends BaseController {
  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  logger = new Logger('AddEmployeeController');

  @Post('facilities/:facilityId/employees')
  async addEmployee(
    @Param('facilityId') facilityId: string,
    @Body() dto: AddEmployeeDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        addEmployeeSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: AddEmployeeResponse = await this.employeeService.addEmployee(
        dto,
        facilityId,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.getValue());

        switch (error.constructor) {
          case AddEmployeeErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Employee successfully added');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
