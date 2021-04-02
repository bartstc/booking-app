import { IPrice } from '../../offers/application/types';

export interface IBookedOfferDto {
  offerId: string;
  employerId: string;
  employerName: string;
  dateFrom: Date;
  dateTo: Date;
  name: string;
  duration: string;
  status: string;
  price: IPrice;
}
