import { Controller, Get, Inject, Logger, Param, Res } from '@nestjs/common';
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

import { GetEmployeeErrors } from './GetEmployee.errors';
import { EmployeeDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { EmployeeQuery } from '../../../adapter';
import { FacilityRepository } from '../../../domain';

type GetEmployeeResponse = Either<
  AppError.UnexpectedError | GetEmployeeErrors.EmployeeDoesNotExistError,
  Result<EmployeeDto>
>;

@Controller()
export class GetEmployeeController extends BaseController {
  constructor(
    @Inject(FacilityKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {
    super();
  }

  private logger = new Logger('GetEmployeeController');

  @Get('facilities/:facilityId/employees/:employeeId')
  @ApiTags('Employees')
  @ApiOkResponse({ type: EmployeeDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  async getEmployee(
    @Param('employeeId') employeeId: string,
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(employeeId, facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEmployeeErrors.EmployeeDoesNotExistError:
          case GetEmployeeErrors.FacilityNotFoundError:
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

  private async handler(
    employeeId: string,
    facilityId: string,
  ): Promise<GetEmployeeResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new GetEmployeeErrors.FacilityNotFoundError(facilityId));
      }

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
