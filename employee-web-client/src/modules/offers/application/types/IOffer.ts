import { IPrice } from './IPrice';
import { OfferStatus } from './OfferStatus';

export interface IOffer {
  offerId: string;
  facilityId: string;
  status: OfferStatus;
  name: string;
  duration: number;
  price: IPrice;
}
