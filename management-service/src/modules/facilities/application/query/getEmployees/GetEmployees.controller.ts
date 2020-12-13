import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  AppError,
  BaseController,
  Either,
  left,
  Result,
  right,
} from 'shared/core';

import { EmployeeQuery, FacilityRepository } from '../../../infra';
import { EmployeeDto } from '../../dto';
import { GetEmployeesErrors } from './GetEmployees.errors';

type GetEmployeesResponse = Either<
  AppError.UnexpectedError,
  Result<EmployeeDto[]>
>;

@Controller()
export class GetEmployeesController extends BaseController {
  constructor(
    private readonly employeeQuery: EmployeeQuery,
    private readonly facilityRepository: FacilityRepository,
  ) {
    super();
  }

  private logger = new Logger('GetEmployeesController');

  @Get('facilities/:facilityId/employees')
  @ApiTags('Employees')
  @ApiOkResponse({ type: EmployeeDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getEmployees(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEmployeesErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
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
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new GetEmployeesErrors.FacilityNotFoundError(facilityId));
      }

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
