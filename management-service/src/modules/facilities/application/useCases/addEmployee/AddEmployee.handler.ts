import { Connection } from 'typeorm/index';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { Facility } from '../../../domain';
import { AddEmployeeErrors } from './AddEmployee.errors';
import { AddEmployeeCommand } from './AddEmployee.command';
import {
  EmployeeMap,
  EmployeeRepository,
  FacilityRepository,
} from '../../../infra';

export type AddEmployeeResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddEmployeeErrors.FacilityNotFoundError,
  Result<void>
>;

@CommandHandler(AddEmployeeCommand)
export class AddEmployeeHandler
  implements ICommandHandler<AddEmployeeCommand, AddEmployeeResponse> {
  constructor(
    private connection: Connection,
    private facilityRepository: FacilityRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    facilityId,
    dto,
  }: AddEmployeeCommand): Promise<AddEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();

    let facility: Facility;

    try {
      try {
        facility = await this.facilityRepository.getFacilityById(facilityId);
      } catch {
        return left(new AddEmployeeErrors.FacilityNotFoundError());
      }

      const employeeOrError = EmployeeMap.dtoToDomain(dto, facilityId);

      if (!employeeOrError.isSuccess) {
        return left(Result.fail(employeeOrError.error));
      }

      const employee = employeeOrError.getValue();
      facility.addEmployee(employee);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(
        await this.employeeRepository.persist(employee),
      );
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
