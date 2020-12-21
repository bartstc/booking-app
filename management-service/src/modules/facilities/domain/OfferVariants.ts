import { WatchedList } from 'shared/domain';

import { OfferVariant } from './OfferVariant';

export class OfferVariants extends WatchedList<OfferVariant> {
  private constructor(initialVariants: OfferVariant[]) {
    super(initialVariants);
  }

  public compareItems(a: OfferVariant, b: OfferVariant): boolean {
    return a.equals(b);
  }

  public static create(initialVariants?: OfferVariant[]): OfferVariants {
    return new OfferVariants(initialVariants ?? []);
  }
}
