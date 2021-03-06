import { Contacts, Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { EmployeeId } from './EmployeeId';
import { FacilityId } from './FacilityId';
import { EmployeeName } from './EmployeeName';
import { EmployeePosition } from './EmployeePosition';
import { EmployeeStatus } from './types';
import {
  EmployeeCannotBeActiveRule,
  EmployeeCannotBeInactiveRule,
} from './rules';

interface IProps {
  facilityId: FacilityId;
  status: EmployeeStatus;
  name: EmployeeName;
  position: EmployeePosition;
  contacts: Contacts;
  birthDate: Date;
  employmentDate: Date;
  isRemoved?: boolean;
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

  get birthDate() {
    return this.props.birthDate;
  }

  get employmentDate() {
    return this.props.employmentDate;
  }

  get position() {
    return this.props.position;
  }

  get contacts() {
    return this.props.contacts;
  }

  get isActive() {
    return this.status === EmployeeStatus.Active;
  }

  public activate() {
    this.checkRule(new EmployeeCannotBeActiveRule(this.status));
    this.props.status = EmployeeStatus.Active;
  }

  public deactivate() {
    this.checkRule(new EmployeeCannotBeInactiveRule(this.status));
    this.props.status = EmployeeStatus.Inactive;
  }

  public remove() {
    this.checkRule(new EmployeeCannotBeActiveRule(this.status));
    this.props.isRemoved = true;
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
      {
        argument: props.birthDate,
        argumentName: 'employee.birthDate',
      },
      {
        argument: props.employmentDate,
        argumentName: 'employee.employmentDate',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Employee(props, id));
  }
}
