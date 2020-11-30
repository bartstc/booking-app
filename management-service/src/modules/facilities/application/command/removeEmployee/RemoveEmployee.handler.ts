import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm/index';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveEmployeeErrors } from './RemoveEmployee.errors';
import { RemoveEmployeeCommand } from './RemoveEmployee.command';
import { Employee, Facility } from '../../../domain';
import {
  EmployeeRepository,
  EntityName,
  FacilityRepository,
} from '../../../infra';

export type RemoveEmployeeResponse = Either<
  | AppError.UnexpectedError
  | RemoveEmployeeErrors.FacilityNotFoundError
  | RemoveEmployeeErrors.EmployeeNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveEmployeeCommand)
export class RemoveEmployeeHandler
  implements ICommandHandler<RemoveEmployeeCommand, RemoveEmployeeResponse> {
  constructor(
    private connection: Connection,
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    facilityId,
    employeeId,
  }: RemoveEmployeeCommand): Promise<RemoveEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();

    let facility: Facility;
    let employee: Employee;

    try {
      try {
        facility = await this.facilityRepository.getFacilityById(facilityId);
      } catch {
        return left(new RemoveEmployeeErrors.FacilityNotFoundError());
      }

      try {
        employee = await this.employeeRepository.getEmployeeById(employeeId);
      } catch {
        return left(new RemoveEmployeeErrors.EmployeeNotFoundError());
      }

      facility.removeEmployee(employee);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.delete(EntityName.Employee, {
        employee_id: employeeId,
      });
      await queryRunner.manager.save(
        await this.facilityRepository.persist(facility),
      );

      await queryRunner.commitTransaction();

      return right(Result.ok());
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return left(new AppError.UnexpectedError(err));
    } finally {
      await queryRunner.release();
    }
  }
}
