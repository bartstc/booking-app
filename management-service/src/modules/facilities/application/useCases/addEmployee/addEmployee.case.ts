import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';
import { Contact, Contacts, UniqueEntityID } from 'shared/domain';

import { FacilityId, Employee, EmployeeName } from '../../../domain';
import { FacilityRepository, EmployeeRepository } from '../../../adapter';
import { AddEmployeeErrors } from './addEmployee.errors';
import { AddEmployeeDto } from './addEmployee.dto';

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
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute(
    dto: AddEmployeeDto,
    facilityId: string,
  ): Promise<AddEmployeeResponse> {
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
      const facility = await this.facilityRepository.getFacilityById(
        facilityId,
      );
      facility.addEmployee(employee);

      await this.employeeRepository.persistModel(employee);
      await this.facilityRepository.persistModel(facility);

      return right(Result.ok(employee));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  private async rollbackSave(employeeId: string): Promise<void> {
    await this.employeeRepository.deleteEmployee(employeeId);
  }
}
