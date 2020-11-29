import { WatchedList } from 'shared/domain';

import { Offer } from './Offer';

export class Offers extends WatchedList<Offer> {
  private constructor(initialOffers: Offer[]) {
    super(initialOffers);
  }

  public compareItems(a: Offer, b: Offer): boolean {
    return a.equals(b);
  }

  public static create(initialOffers?: Offer[]): Offers {
    return new Offers(initialOffers ?? []);
  }
}
