import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { EmployeeDto } from '../../dtos';
import { EmployeeMap, EmployeeRepository } from '../../../adapter';

type GetEmployeesResponse = Either<
  AppError.UnexpectedError,
  Result<EmployeeDto[]>
>;

@Injectable()
export class GetEmployeesCase
  implements UseCase<string, Promise<GetEmployeesResponse>> {
  constructor(
    @InjectRepository(EmployeeRepository)
    private repository: EmployeeRepository,
  ) {}

  async execute(facilityId: string): Promise<GetEmployeesResponse> {
    let rawEmployees;

    try {
      try {
        rawEmployees = await this.repository.getRawAllEmployees(facilityId);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(EmployeeMap.rawToDtoBulk(rawEmployees)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
