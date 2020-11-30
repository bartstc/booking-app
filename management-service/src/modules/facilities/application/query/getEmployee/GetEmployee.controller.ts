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

import { GetEmployeeErrors } from './GetEmployee.errors';
import { EmployeeQuery } from '../../../infra';
import { EmployeeDto } from '../../dto';

type GetEmployeeResponse = Either<
  AppError.UnexpectedError | GetEmployeeErrors.EmployeeDoesNotExistError,
  Result<EmployeeDto>
>;

@Controller()
export class GetEmployeeController extends BaseController {
  constructor(private readonly employeeQuery: EmployeeQuery) {
    super();
  }

  private logger = new Logger('GetEmployeeController');

  @Get('facilities/:facilityId/employees/:employeeId')
  async getEmployee(
    @Param('employeeId') employeeId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(employeeId);

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

  private async handler(employeeId: string): Promise<GetEmployeeResponse> {
    let dto;

    try {
      try {
        dto = await this.employeeQuery.getEmployeeById(employeeId);
      } catch {
        return left(
          new GetEmployeeErrors.EmployeeDoesNotExistError(employeeId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
