import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { EmployeeDto } from '../../dtos';
import { EmployeeMap, EmployeeRepository } from '../../../adapter';
import { GetEmployeeErrors } from './getEmployee.errors';

type GetEmployeeResponse = Either<
  AppError.UnexpectedError | GetEmployeeErrors.EmployeeDoesNotExistError,
  Result<EmployeeDto>
>;

@Injectable()
export class GetEmployeeCase
  implements UseCase<string, Promise<GetEmployeeResponse>> {
  constructor(private repository: EmployeeRepository) {}

  async execute(employeeId: string): Promise<GetEmployeeResponse> {
    let rawEmployee;

    try {
      try {
        rawEmployee = await this.repository.getRawEmployeeById(employeeId);
      } catch {
        return left(
          new GetEmployeeErrors.EmployeeDoesNotExistError(employeeId),
        );
      }

      return right(Result.ok(EmployeeMap.rawToDto(rawEmployee)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
