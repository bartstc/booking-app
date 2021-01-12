import { Result, DomainError } from 'shared/core';

export class OfferIsAlreadyInactiveGuard extends Result<DomainError> {
  constructor() {
    super(false, {
      message: `Offer is already inactive. Action is not allowed.`,
    });
  }
}
