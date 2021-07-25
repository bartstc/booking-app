import { IBusinessRule } from 'shared/domain/types';

import { FacilityId } from '../../../facilities/domain';

export class EmployeeHasAlreadyAccessToProvidedFacilityRule
  implements IBusinessRule {
  constructor(
    private readonly newFacilityIds: Array<FacilityId>,
    private readonly accessibleFacilityIds: Array<FacilityId>,
    public readonly message = 'Employee has already access to provided facility/facilities',
  ) {}

  public isBroken(): boolean {
    return this.accessibleFacilityIds.some((facilityId) =>
      this.newFacilityIds
        .map((newFacilityId) => newFacilityId.id.toString())
        .includes(facilityId.id.toString()),
    );
  }
}
