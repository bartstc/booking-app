import { Result, UseCaseError } from 'shared/core';

export namespace RemoveOfferErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `facilityDoesNotExist`,
      });
    }
  }

  export class OfferNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `offerDoesNotExist`,
      });
    }
  }
}
