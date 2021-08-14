import { Result, UseCaseError } from 'shared/core';

export namespace GetPublicOfferErrors {
  export class OfferDoesNotExistError extends Result<UseCaseError> {
    constructor(offerId: string) {
      super(false, {
        message: `Offer with id ${offerId} does not exist`,
      });
    }
  }
}
