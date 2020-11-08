import { Mapper } from 'shared/core/Mapper';
import { Contact, Contacts, UniqueEntityID } from 'shared/domain';

import { Employee, EmployeeName, FacilityId } from '../../domain';
import { EmployeeEntity } from '../../infra/entities';

export class EmployeeMap implements Mapper<Employee> {
  public static toDomain(entity: EmployeeEntity): Employee {
    const name = EmployeeName.create({ value: entity.details.name });
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
        contacts,
        employmentDate: entity.details.employmentDate,
        position: entity.details.position,
      },
      new UniqueEntityID(entity.employee_id),
    );

    if (!employeeOfError.isSuccess) {
      console.log(employeeOfError.error);
    }

    return employeeOfError.getValue();
  }

  public static toDomainBulk(entities: EmployeeEntity[]): Employee[] {
    return entities.map(entity => this.toDomain(entity));
  }
}
