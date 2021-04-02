import { IBookedOfferDto } from './IBookedOfferDto';
import { IPrice } from '../../offers/application/types';

export interface IReservationDto {
  customerId: string;
  customerName: string;
  totalPrice: IPrice;
  offers: Array<IBookedOfferDto>;
}
