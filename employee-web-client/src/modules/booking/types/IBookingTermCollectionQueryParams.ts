import { IQueryParams } from 'types';

export interface IBookingTermCollectionQueryParams extends IQueryParams {
  offerId: string;
  dateFrom: string;
  dateTo: string;
}
