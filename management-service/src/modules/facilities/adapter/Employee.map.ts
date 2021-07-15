import { Contact, Contacts, UniqueEntityID } from 'shared/domain';
import { Result } from 'shared/core';

import {
  Employee,
  EmployeeEmail,
  EmployeeName,
  EmployeePosition,
  FacilityId,
} from '../domain';
import { BuildEmployeeDto } from './BuildEmployee.dto';
import { EmployeeStatus } from '../domain/types';

export class EmployeeMap {
  public static dtoToDomain<T extends BuildEmployeeDto>(
    dto: T,
    facilityId: string,
    employeeId?: string,
  ): Result<Employee> {
    const name = EmployeeName.create({ value: dto.employeeName });
    const position = EmployeePosition.create({
      value: dto.position,
    });
    const email = EmployeeEmail.create({ value: dto.employeeEmail });
    const contactList: Contact[] = [];

    if (dto.contacts?.length) {
      dto.contacts.forEach((contact) => {
        contactList.push(Contact.create(contact).getValue());
      });
    }

    const contacts = Contacts.create(contactList);

    return Employee.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(facilityId),
        ).getValue(),
        status: EmployeeStatus.Active,
        email: email.getValue(),
        name: name.getValue(),
        position: position.getValue(),
        contacts,
        birthDate: dto.birthDate,
        employmentDate: dto.employmentDate,
      },
      new UniqueEntityID(employeeId),
    );
  }

  public static entityToDomain(entity: any): Employee {
    const name = EmployeeName.create({ value: entity.details.name });
    const position = EmployeePosition.create({
      value: entity.details.position,
    });
    const email = EmployeeEmail.create({ value: entity.details.email });
    const contactList: Contact[] = [];

    entity.details.contacts.forEach((contact) => {
      contactList.push(Contact.create(contact).getValue());
    });

    const contacts = Contacts.create(contactList);

    const employeeOfError = Employee.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(entity.facility_id),
        ).getValue(),
        status: entity.status,
        email: email.getValue(),
        birthDate: entity.details.birthDate,
        employmentDate: entity.details.employmentDate,
        name: name.getValue(),
        position: position.getValue(),
        contacts,
      },
      new UniqueEntityID(entity.employee_id),
    );

    if (!employeeOfError.isSuccess) {
      console.log(employeeOfError.error);
    }

    return employeeOfError.getValue();
  }

  public static entityToDomainBulk(entities: any[]): Employee[] {
    return entities.map((entity) => this.entityToDomain(entity));
  }

  public static toPersistence(employee: Employee): Partial<any> {
    return {
      employee_id: employee.employeeId.id.toString(),
      facility_id: employee.facilityId,
      status: employee.status,
      details: {
        email: employee.email.value,
        name: employee.name.value,
        position: employee.position.value,
        birthDate: employee.birthDate,
        employmentDate: employee.employmentDate,
        contacts: employee.contacts.getItems().map((contact) => contact.props),
      },
    };
  }
}
