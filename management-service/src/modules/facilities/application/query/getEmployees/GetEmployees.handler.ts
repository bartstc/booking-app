import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { EmployeeDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { EmployeeQuery } from '../../../adapter';
import { FacilityRepository } from '../../../domain/repositories';
import { GetEmployeesQuery } from './GetEmployees.query';
import { GetEmployeesErrors } from './GetEmployees.errors';

export type GetEmployeesResponse = Either<
  AppError.UnexpectedError | GetEmployeesErrors.FacilityNotFoundError,
  Result<EmployeeDto[]>
>;

@QueryHandler(GetEmployeesQuery)
export class GetEmployeesHandler
  implements IQueryHandler<GetEmployeesQuery, GetEmployeesResponse> {
  constructor(
    @Inject(FacilityKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
    params,
  }: GetEmployeesQuery): Promise<GetEmployeesResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new GetEmployeesErrors.FacilityNotFoundError(facilityId));
      }

      try {
        dto = await this.employeeQuery.getEmployees(facilityId, params);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
