import { IBusinessRule } from 'shared/domain/types';

import { OfferStatus } from '../types';

export class OfferCannotBeInactiveRule implements IBusinessRule {
  constructor(
    private readonly status: OfferStatus,
    public readonly message = 'Offer cannot be inactive',
  ) {}

  public isBroken(): boolean {
    return this.status === OfferStatus.Inactive;
  }
}
