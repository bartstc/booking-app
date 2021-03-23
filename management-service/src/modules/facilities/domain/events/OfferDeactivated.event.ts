import { OfferStatus } from '../types';

export class OfferDeactivatedEvent {
  private readonly status = OfferStatus.Inactive;
}
