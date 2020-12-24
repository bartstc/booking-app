import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { ActivateEmployeeErrors } from './ActivateEmployee.errors';
import { ActivateEmployeeCommand } from './ActivateEmployee.command';
import {
  Employee,
  EmployeeRepository,
  FacilityRepository,
} from '../../../domain';
import { FacilityKeys } from '../../../FacilityKeys';
import { EmployeeIsAlreadyActiveGuard } from '../../../domain/guards';

export type ActivateEmployeeResponse = Either<
  | AppError.UnexpectedError
  | ActivateEmployeeErrors.FacilityNotFoundError
  | ActivateEmployeeErrors.EmployeeNotFoundError
  | EmployeeIsAlreadyActiveGuard,
  Result<void>
>;

@CommandHandler(ActivateEmployeeCommand)
export class ActivateEmployeeHandler
  implements
    ICommandHandler<ActivateEmployeeCommand, ActivateEmployeeResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(FacilityKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    facilityId,
    employeeId,
  }: ActivateEmployeeCommand): Promise<ActivateEmployeeResponse> {
    let employee: Employee;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new ActivateEmployeeErrors.FacilityNotFoundError());
      }

      try {
        employee = await this.employeeRepository.getEmployeeById(employeeId);
      } catch {
        return left(new ActivateEmployeeErrors.EmployeeNotFoundError());
      }

      if (employee.isActive) {
        return left(new EmployeeIsAlreadyActiveGuard());
      }

      employee.activate();

      const entity = await this.employeeRepository.persist(employee);
      await entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
