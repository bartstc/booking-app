import { Contacts, Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { EmployeeId } from './EmployeeId';
import { EmployeeName } from './EmployeeName';
import { EmployeePosition } from './EmployeePosition';
import { EmployeeEmail } from './EmployeeEmail';
import { EmployeeScope } from './EmployeeScope';
import { EmployeeStatus } from './types';
import {
  EmployeeCannotBeActiveRule,
  EmployeeCannotBeInactiveRule,
  EmployeeHasAlreadyAccessToProvidedFacilityRule,
} from './rules';
import { EnterpriseId } from '../../enterprise/domain';
import { FacilityId } from '../../facilities/domain';

interface IProps {
  enterpriseId: EnterpriseId;
  status: EmployeeStatus;
  name: EmployeeName;
  position: EmployeePosition;
  contacts: Contacts;
  birthDate: Date;
  employmentDate: Date;
  email: EmployeeEmail;
  scope: EmployeeScope;
  isRemoved?: boolean;
}

export class Employee extends Entity<IProps> {
  get employeeId() {
    return EmployeeId.create(this._id).getValue();
  }

  get enterpriseId() {
    return this.props.enterpriseId;
  }

  get status() {
    return this.props.status;
  }

  get email() {
    return this.props.email;
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

  get scope() {
    return this.props.scope;
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

  public extendAvailableFacilities(newFacilityIds: Array<FacilityId>) {
    this.checkRule(
      new EmployeeHasAlreadyAccessToProvidedFacilityRule(
        newFacilityIds,
        this.props.scope.facilityIds.getItems(),
      ),
    );

    newFacilityIds.forEach((facilityId) => {
      this.props.scope.facilityIds.add(facilityId);
    });

    if (this.scope.activeFacilityId === null) {
      this.scope.changeActiveFacility(newFacilityIds[0]);
    }
  }

  public changeActiveFacility(facilityId: FacilityId) {
    this.scope.changeActiveFacility(facilityId);
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Employee> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.name,
        argumentName: 'employee.name',
      },
      {
        argument: props.email,
        argumentName: 'employee.email',
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
