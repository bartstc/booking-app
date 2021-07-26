import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { EmployeeCollectionDto } from '../../dto';
import { EmployeeQuery } from '../../../adapter';
import { GetEmployeesQuery } from './GetEmployees.query';
import { GetEmployeesErrors } from './GetEmployees.errors';
import { EmployeeKeys } from '../../../EmployeeKeys';
import { GetEmployeeErrors } from '../getEmployee';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain';

export type GetEmployeesResponse = Either<
  AppError.UnexpectedError | GetEmployeesErrors.EnterpriseNotFoundError,
  Result<EmployeeCollectionDto>
>;

@QueryHandler(GetEmployeesQuery)
export class GetEmployeesHandler
  implements IQueryHandler<GetEmployeesQuery, GetEmployeesResponse> {
  constructor(
    @Inject(EmployeeKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
  ) {}

  async execute({
    params,
    enterpriseId,
  }: GetEmployeesQuery): Promise<GetEmployeesResponse> {
    let dto;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );

      if (!enterpriseExists) {
        return left(new GetEmployeeErrors.EnterpriseNotFoundError());
      }

      try {
        dto = await this.employeeQuery.getEmployees(enterpriseId, params);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
