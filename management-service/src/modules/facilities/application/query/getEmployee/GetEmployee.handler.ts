import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { EmployeeDto } from '../../dto';
import { GetEmployeeErrors } from './GetEmployee.errors';
import { GetEmployeeQuery } from './GetEmployee.query';
import { FacilityKeys } from '../../../FacilityKeys';
import { EmployeeQuery } from '../../../adapter';
import { FacilityRepository } from '../../../domain/repositories';

export type GetEmployeeResponse = Either<
  AppError.UnexpectedError | GetEmployeeErrors.EmployeeDoesNotExistError,
  Result<EmployeeDto>
>;

@QueryHandler(GetEmployeeQuery)
export class GetEmployeeHandler
  implements IQueryHandler<GetEmployeeQuery, GetEmployeeResponse> {
  constructor(
    @Inject(FacilityKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
    employeeId,
  }: GetEmployeeQuery): Promise<GetEmployeeResponse> {
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
