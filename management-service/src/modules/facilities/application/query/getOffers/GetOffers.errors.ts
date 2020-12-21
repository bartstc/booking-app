import { Result, UseCaseError } from 'shared/core';

export namespace GetOffersErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor(facilityId: string) {
      super(false, {
        message: `Facility with id ${facilityId} does not exist`,
      });
    }
  }
}
