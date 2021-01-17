import { IBusinessRule } from 'shared/domain/types';

import { OfferStatus } from '../types';

export class OfferCannotBeActiveRule implements IBusinessRule {
  constructor(
    private readonly status: OfferStatus,
    public readonly message = 'Offer cannot be active',
  ) {}

  public isBroken(): boolean {
    return this.status === OfferStatus.Active;
  }
}
