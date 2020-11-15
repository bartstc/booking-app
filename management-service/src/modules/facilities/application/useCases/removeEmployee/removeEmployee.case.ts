import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm/index';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { FacilityRepository, EmployeeRepository } from '../../../adapter';
import { RemoveEmployeeErrors } from './removeEmployee.errors';
import { RemoveEmployeeDto } from './removeEmployee.dto';
import { FacilityFactory } from '../../factories';
import { EntityName } from '../../../infra/entities';

export type RemoveEmployeeResponse = Either<
  | AppError.UnexpectedError
  | RemoveEmployeeErrors.FacilityNotFoundError
  | RemoveEmployeeErrors.EmployeeNotFoundError,
  Result<void>
>;

export class RemoveEmployeeCase
  implements UseCase<RemoveEmployeeDto, Promise<RemoveEmployeeResponse>> {
  constructor(
    private connection: Connection,
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    private facilityFactory: FacilityFactory,
  ) {}

  async execute({
    facilityId,
    employeeId,
  }: RemoveEmployeeDto): Promise<RemoveEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new RemoveEmployeeErrors.FacilityNotFoundError());
      }

      const employeeExists = await this.employeeRepository.exists(employeeId);
      if (!employeeExists) {
        return left(new RemoveEmployeeErrors.EmployeeNotFoundError());
      }

      const employee = await this.employeeRepository.getEmployeeById(
        employeeId,
      );
      const facility = await this.facilityFactory.buildFromRepository(
        facilityId,
      );
      facility.removeEmployee(employee);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.delete(EntityName.Employee, {
        employee_id: employeeId,
      });
      await queryRunner.manager.save(
        await this.facilityRepository.persistModel(facility),
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
