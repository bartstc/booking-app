import { Result, DomainError } from 'shared/core';

export class OfferIsAlreadyActiveGuard extends Result<DomainError> {
  constructor() {
    super(false, {
      message: `Offer is already active. Action is not allowed.`,
    });
  }
}
