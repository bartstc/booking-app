import { Contact, Contacts, ContextType, UniqueEntityID } from 'shared/domain';
import { Result } from 'shared/core';

import {
  Employee,
  EmployeeEmail,
  EmployeeId,
  EmployeeName,
  EmployeePosition,
  EmployeeScope,
  EmployeeStatus,
} from '../domain';
import { BuildEmployeeDto } from './BuildEmployee.dto';
import { EnterpriseId } from '../../enterprise/domain';
import { FacilityId } from '../../facilities/domain';
import { ScopeFacilityIds } from '../domain/ScopeFacilityIds';

interface IDtoToDomainProps<T extends BuildEmployeeDto> {
  dto: T;
  enterpriseId: string;
  employeeId?: EmployeeId;
  activeFacilityId?: FacilityId;
  facilityIds?: ScopeFacilityIds;
}

export class EmployeeMap {
  public static dtoToDomain<T extends BuildEmployeeDto>({
    dto,
    enterpriseId,
    employeeId,
    facilityIds,
    activeFacilityId,
  }: IDtoToDomainProps<T>): Result<Employee> {
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

    const scope = EmployeeScope.create({
      employeeId:
        employeeId ?? EmployeeId.create(new UniqueEntityID()).getValue(),
      enterpriseId: EnterpriseId.create(
        new UniqueEntityID(enterpriseId),
      ).getValue(),
      facilityIds: facilityIds ?? ScopeFacilityIds.create(),
      contextType: ContextType.Employee,
      activeFacilityId:
        activeFacilityId ?? facilityIds ? facilityIds.getItems()[0] : null,
    }).getValue();

    return Employee.create(
      {
        enterpriseId: EnterpriseId.create(
          new UniqueEntityID(enterpriseId),
        ).getValue(),
        scope,
        status: EmployeeStatus.Active,
        email: email.getValue(),
        name: name.getValue(),
        position: position.getValue(),
        contacts,
        birthDate: dto.birthDate,
        employmentDate: dto.employmentDate,
      },
      new UniqueEntityID(employeeId.id.toString()),
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

    const scopeFacilityIds = ScopeFacilityIds.create(
      entity.scope.facilityIds.map((facilityId) =>
        FacilityId.create(new UniqueEntityID(facilityId)).getValue(),
      ),
    );

    const scope = EmployeeScope.create({
      employeeId: EmployeeId.create(
        new UniqueEntityID(entity.employee_id),
      ).getValue(),
      enterpriseId: EnterpriseId.create(
        new UniqueEntityID(entity.enterprise_id),
      ).getValue(),
      facilityIds: scopeFacilityIds,
      contextType: ContextType.Employee,
      activeFacilityId: entity.scope.activeFacilityId
        ? FacilityId.create(
            new UniqueEntityID(entity.scope.activeFacilityId),
          ).getValue()
        : null,
    }).getValue();

    const employeeOfError = Employee.create(
      {
        enterpriseId: EnterpriseId.create(
          new UniqueEntityID(entity.enterprise_id),
        ).getValue(),
        scope,
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
      enterprise_id: employee.enterpriseId.id.toString(),
      status: employee.status,
      scope: {
        employeeId: employee.employeeId.id.toString(),
        contextType: ContextType.Employee,
        enterpriseId: employee.enterpriseId.id.toString(),
        facilityIds: employee.scope.facilityIds
          .getItems()
          .map((facilityId) => facilityId.id.toString()),
        activeFacilityId: employee.scope.activeFacilityId
          ? employee.scope.activeFacilityId.id.toString()
          : null,
      },
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
