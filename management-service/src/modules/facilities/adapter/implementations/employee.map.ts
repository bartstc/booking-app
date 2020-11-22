import { Mapper } from 'shared/core/Mapper';
import { Contact, Contacts, UniqueEntityID } from 'shared/domain';

import {
  Employee,
  EmployeeName,
  EmployeePosition,
  FacilityId,
} from '../../domain';
import { EmployeeEntity } from '../../infra/entities';
import { EmployeeDto } from '../../application/dtos';

export class EmployeeMap implements Mapper<Employee> {
  public static toDomain(entity: EmployeeEntity): Employee {
    const name = EmployeeName.create({ value: entity.details.name });
    const position = EmployeePosition.create({
      value: entity.details.position,
    });
    const contactList: Contact[] = [];

    entity.details.contacts.forEach(contact => {
      contactList.push(Contact.create(contact).getValue());
    });

    const contacts = Contacts.create(contactList);

    const employeeOfError = Employee.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(entity.facility_id),
        ).getValue(),
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

  public static rawToDtoBulk(employees: EmployeeEntity[]): EmployeeDto[] {
    return employees.map(employee => this.rawToDto(employee));
  }

  public static rawToDto(employee: EmployeeEntity): EmployeeDto {
    return {
      employeeId: employee.employee_id,
      facilityId: employee.facility_id,
      name: employee.details.name,
      position: employee.details.position,
      contacts: employee.details.contacts,
    };
  }

  public static toDomainBulk(entities: EmployeeEntity[]): Employee[] {
    return entities.map(entity => this.toDomain(entity));
  }

  public static modelToPersistence(
    employee: Employee,
  ): Partial<EmployeeEntity> {
    return {
      employee_id: employee.employeeId.id.toString(),
      facility_id: employee.facilityId,
      details: {
        name: employee.name.value,
        position: employee.position.value,
        contacts: employee.contacts.getItems().map(contact => contact.props),
      },
    };
  }
}
