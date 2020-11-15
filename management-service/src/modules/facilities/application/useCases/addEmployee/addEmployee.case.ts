import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';
import { Contact, Contacts, UniqueEntityID } from 'shared/domain';

import { FacilityId, Employee, EmployeeName } from '../../../domain';
import { FacilityRepository, EmployeeRepository } from '../../../adapter';
import { AddEmployeeErrors } from './addEmployee.errors';
import { AddEmployeeDto } from './addEmployee.dto';
import { FacilityFactory } from '../../factories';

export type AddEmployeeResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddEmployeeErrors.FacilityNotFoundError,
  Result<Employee>
>;

@Injectable()
export class AddEmployeeCase
  implements UseCase<AddEmployeeDto, Promise<AddEmployeeResponse>> {
  constructor(
    private connection: Connection,
    private facilityRepository: FacilityRepository,
    private employeeRepository: EmployeeRepository,
    private facilityFactory: FacilityFactory,
  ) {}

  async execute(
    dto: AddEmployeeDto,
    facilityId: string,
  ): Promise<AddEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new AddEmployeeErrors.FacilityNotFoundError());
      }

      const name = EmployeeName.create({ value: dto.employeeName });
      const contacts = Contacts.create(
        dto.contacts
          ? dto.contacts.map(contact => Contact.create(contact).getValue())
          : undefined,
      );

      const newEmployeeOrError = Employee.create({
        facilityId: FacilityId.create(
          new UniqueEntityID(facilityId),
        ).getValue(),
        name: name.getValue(),
        position: dto.position,
        employmentDate: dto.employmentDate,
        contacts,
      });

      if (!newEmployeeOrError.isSuccess) {
        return left(Result.fail(newEmployeeOrError.error));
      }

      const employee = newEmployeeOrError.getValue();
      const facility = await this.facilityFactory.buildFromRepository(
        facilityId,
      );
      facility.addEmployee(employee);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(
        await this.employeeRepository.persistModel(employee),
      );
      await queryRunner.manager.save(
        await this.facilityRepository.persistModel(facility),
      );

      await queryRunner.commitTransaction();

      return right(Result.ok(employee));
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return left(new AppError.UnexpectedError(err));
    } finally {
      await queryRunner.release();
    }
  }
}
