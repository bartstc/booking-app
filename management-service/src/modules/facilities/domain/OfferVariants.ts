import { WatchedList } from 'shared/domain';
import { Result } from 'shared/core';

import { OfferVariant } from './OfferVariant';

export class OfferVariants extends WatchedList<OfferVariant> {
  private constructor(initialVariants: OfferVariant[]) {
    super(initialVariants);
  }

  public compareItems(a: OfferVariant, b: OfferVariant): boolean {
    return a.equals(b);
  }

  public static create(
    initialVariants?: OfferVariant[],
  ): Result<OfferVariants> {
    if (initialVariants?.length > 1) {
      return Result.fail({ message: 'variants.tooMany' });
    }

    return Result.ok(new OfferVariants(initialVariants ?? []));
  }
}
