import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { EmployeeRepository } from '../../../domain/repositories';
import { Employee } from '../../../domain';
import { FacilityId } from '../../../../facilities/domain';

import { ChangeActiveFacilityErrors } from './ChangeActiveFacility.errors';
import { ChangeActiveFacilityCommand } from './ChangeActiveFacility.command';
import { EmployeeKeys } from '../../../EmployeeKeys';

export type ChangeActiveFacilityResponse = Either<
  AppError.UnexpectedError | ChangeActiveFacilityErrors.EmployeeNotFoundError,
  Result<void>
>;

@CommandHandler(ChangeActiveFacilityCommand)
export class ChangeActiveFacilityHandler
  implements
    ICommandHandler<ChangeActiveFacilityCommand, ChangeActiveFacilityResponse> {
  constructor(
    @Inject(EmployeeKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    employeeId,
    dto,
  }: ChangeActiveFacilityCommand): Promise<ChangeActiveFacilityResponse> {
    try {
      let employee: Employee;

      try {
        employee = await this.employeeRepository.getEmployeeById(employeeId);
      } catch {
        return left(new ChangeActiveFacilityErrors.EmployeeNotFoundError());
      }

      employee.changeActiveFacility(
        FacilityId.create(new UniqueEntityID(dto.facilityId)).getValue(),
      );

      const entity = await this.employeeRepository.persist(employee);
      await entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
