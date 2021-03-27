import { Result, UseCaseError } from 'shared/core';

export namespace UpdateFacilityErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor(facilityId: string) {
      super(false, { message: `Facility with id ${facilityId} not found` });
    }
  }
}
