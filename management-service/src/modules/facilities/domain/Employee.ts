import { Contacts, Entity } from 'shared/domain';
import { Guard, Result, TextValidator } from 'shared/core';

import { EmployeeId } from './EmployeeId';
import { FacilityId } from './FacilityId';
import { EmployeeName } from './EmployeeName';
import { EmployeePosition } from './types';

interface IProps {
  employeeId: EmployeeId;
  facilityId: FacilityId;
  name: EmployeeName;
  position: EmployeePosition;
  employmentDate: string;
  contacts: Contacts;
}

export class Employee extends Entity<IProps> {
  get employeeId() {
    return EmployeeId.create(this._id).getValue();
  }

  get facilityId() {
    return this.props.facilityId;
  }

  get name() {
    return this.props.name;
  }

  get position() {
    return this.props.position;
  }

  get employmentDate() {
    return this.props.employmentDate;
  }

  get contacts() {
    return this.props.contacts;
  }

  public static isPositionValid(value: string) {
    return Object.values(EmployeePosition).some(position => position === value);
  }

  public static create(props: IProps): Result<Employee> {
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
        argument: props.employmentDate,
        argumentName: 'employee.employmentDate',
      },
      {
        argument: props.facilityId,
        argumentName: 'employee.facilityId',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    if (!this.isPositionValid(props.position)) {
      return Result.fail({ message: 'employee.position.invalid' });
    }

    if (!TextValidator.validateDate(props.employmentDate)) {
      return Result.fail({ message: `employee.employmentDate.invalidFormat` });
    }

    return Result.ok(new Employee(props));
  }
}
