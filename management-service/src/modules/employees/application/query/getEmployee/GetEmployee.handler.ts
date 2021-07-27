import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { EmployeeDto } from '../../dto';
import { GetEmployeeErrors } from './GetEmployee.errors';
import { GetEmployeeQuery } from './GetEmployee.query';
import { EmployeeQuery } from '../../../adapter';
import { EmployeeKeys } from '../../../EmployeeKeys';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain/repositories';

export type GetEmployeeResponse = Either<
  | AppError.UnexpectedError
  | GetEmployeeErrors.EmployeeDoesNotExistError
  | GetEmployeeErrors.EnterpriseNotFoundError,
  Result<EmployeeDto>
>;

@QueryHandler(GetEmployeeQuery)
export class GetEmployeeHandler
  implements IQueryHandler<GetEmployeeQuery, GetEmployeeResponse> {
  constructor(
    @Inject(EmployeeKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
  ) {}

  async execute({
    enterpriseId,
    employeeId,
  }: GetEmployeeQuery): Promise<GetEmployeeResponse> {
    let dto;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );

      if (!enterpriseExists) {
        return left(new GetEmployeeErrors.EnterpriseNotFoundError());
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
