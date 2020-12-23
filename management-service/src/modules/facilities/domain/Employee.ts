import { Contacts, Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { EmployeeId } from './EmployeeId';
import { FacilityId } from './FacilityId';
import { EmployeeName } from './EmployeeName';
import { EmployeePosition } from './EmployeePosition';
import { EmployeeStatus } from './types';
import {
  EmployeeIsAlreadyActiveGuard,
  EmployeeIsAlreadyInactiveGuard,
} from './guards';

interface IProps {
  facilityId: FacilityId;
  status: EmployeeStatus;
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

  get status() {
    return this.props.status;
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

  public activate() {
    if (this.status === EmployeeStatus.Active) {
      throw new EmployeeIsAlreadyActiveGuard();
    }

    this.props.status = EmployeeStatus.Active;
  }

  public deactivate() {
    if (this.status === EmployeeStatus.Inactive) {
      throw new EmployeeIsAlreadyInactiveGuard();
    }

    this.props.status = EmployeeStatus.Inactive;
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
      {
        argument: props.status,
        argumentName: 'employee.status',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Employee(props, id));
  }
}
