import { ContextType, ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { EnterpriseId } from '../../enterprise/domain';
import { FacilityId } from '../../facilities/domain';

import { EmployeeId } from './EmployeeId';
import { ScopeFacilityIds } from './ScopeFacilityIds';

interface IProps {
  employeeId: EmployeeId;
  enterpriseId: EnterpriseId;
  contextType: ContextType;
  facilityIds: ScopeFacilityIds;
  activeFacilityId: FacilityId | null;
}

export class EmployeeScope extends ValueObject<IProps> {
  get employeeId() {
    return this.props.employeeId;
  }

  get enterpriseId() {
    return this.props.enterpriseId;
  }

  get contextType() {
    return this.props.contextType;
  }

  get facilityIds() {
    return this.props.facilityIds;
  }

  get activeFacilityId(): FacilityId | null {
    return this.props.activeFacilityId;
  }

  public changeActiveFacility(facilityId: FacilityId) {
    this.props.activeFacilityId = facilityId;
  }

  public static create(props: IProps): Result<EmployeeScope> {
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

    return Result.ok(new EmployeeScope(props));
  }
}
