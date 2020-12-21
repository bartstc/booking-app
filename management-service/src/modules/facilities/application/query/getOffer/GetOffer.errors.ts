import { Result, UseCaseError } from 'shared/core';

export namespace GetOfferErrors {
  export class OfferDoesNotExistError extends Result<UseCaseError> {
    constructor(offerId: string) {
      super(false, {
        message: `Offer with id ${offerId} does not exist`,
      });
    }
  }

  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor(facilityId: string) {
      super(false, {
        message: `Facility with id ${facilityId} does not exist`,
      });
    }
  }
}
