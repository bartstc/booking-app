import { ContextType, Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { EnterpriseId } from '../../enterprise/domain';
import { FacilityId } from '../../facilities/domain';

import { EmployeeScopeId } from './EmployeeScopeId';
import { EmployeeId } from './EmployeeId';

interface IProps {
  employeeScopeId: EmployeeScopeId;
  employeeId: EmployeeId;
  enterpriseId: EnterpriseId;
  contextType: ContextType;
  facilityIds: Array<FacilityId>;
  activeFacilityId: FacilityId | null;
}

export class EmployeeScope extends Entity<IProps> {
  get employeeScopeId() {
    return EmployeeScopeId.create(this._id).getValue();
  }

  get employeeId() {
    return this.props.employeeId.id.toString();
  }

  get enterpriseId() {
    return this.props.enterpriseId.id.toString();
  }

  get contextType() {
    return this.props.contextType;
  }

  get facilityIds() {
    return this.props.facilityIds;
  }

  get activeFacilityId() {
    return this.props.activeFacilityId.id.toString();
  }

  public static create(
    props: IProps,
    id?: UniqueEntityID,
  ): Result<EmployeeScope> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.enterpriseId,
        argumentName: 'employeeScope.enterpriseId',
      },
      {
        argument: props.contextType,
        argumentName: 'employeeScope.contextType',
      },
      {
        argument: props.facilityIds,
        argumentName: 'employeeScope.facilityIds',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new EmployeeScope(props, id));
  }
}
