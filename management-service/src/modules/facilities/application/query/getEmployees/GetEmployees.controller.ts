import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  AppError,
  BaseController,
  Either,
  left,
  Result,
  right,
} from 'shared/core';

import { EmployeeQuery } from '../../../infra';
import { EmployeeDto } from '../../dto';

type GetEmployeesResponse = Either<
  AppError.UnexpectedError,
  Result<EmployeeDto[]>
>;

@Controller()
export class GetEmployeesController extends BaseController {
  constructor(private readonly employeeQuery: EmployeeQuery) {
    super();
  }

  private logger = new Logger('GetEmployeesController');

  @Get('facilities/:facilityId/employees')
  async getEmployees(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(facilityId);

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

  private async handler(facilityId: string): Promise<GetEmployeesResponse> {
    let dto;

    try {
      try {
        dto = await this.employeeQuery.getFacilityEmployees(facilityId);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
