import { Contacts, Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result, TextValidator } from 'shared/core';

import { EmployeeId } from './EmployeeId';
import { FacilityId } from './FacilityId';
import { EmployeeName } from './EmployeeName';
import { EmployeePosition } from './EmployeePosition';

interface IProps {
  facilityId: FacilityId;
  name: EmployeeName;
  position: EmployeePosition;
  contacts: Contacts;
}

export class Employee extends Entity<IProps> {
  get employeeId() {
    return EmployeeId.create(this._id).getValue();
  }

  get facilityId() {
    return this.props.facilityId.id.toString();
  }

  get name() {
    return this.props.name;
  }

  get position() {
    return this.props.position;
  }

  get contacts() {
    return this.props.contacts;
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Employee> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.name,
        argumentName: 'employee.name',
      },
      {
        argument: props.position,
        argumentName: 'employee.position',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Employee(props, id));
  }
}
