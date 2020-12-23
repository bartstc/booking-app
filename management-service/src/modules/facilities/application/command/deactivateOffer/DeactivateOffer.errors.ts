import { Result, UseCaseError } from 'shared/core';

export namespace DeactivateOfferErrors {
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

  export class OfferIsAlreadyInactiveError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `offerIsAlreadyInactive`,
      });
    }
  }
}
