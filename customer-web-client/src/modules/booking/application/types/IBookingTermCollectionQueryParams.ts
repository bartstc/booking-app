import { IQueryParams } from 'types';

export interface IBookingTermCollectionQueryParams extends Partial<IQueryParams> {
  offerId: string;
  dateFrom: string;
  dateTo: string;
}
