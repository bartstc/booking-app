import { Result, DomainError } from 'shared/core';

export class CannotRemoveActiveOfferGuard extends Result<DomainError> {
  constructor() {
    super(false, {
      message: `Cannot remove offer which is active.`,
    });
  }
}
