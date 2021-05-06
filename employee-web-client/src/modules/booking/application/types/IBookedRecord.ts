import { Currency } from 'types';

export interface IBookedRecord {
  bookedRecordId: string;
  bookingId: string;
  offerId: string;
  offerName: string;
  employeeId: string;
  employeeName: string;
  customerId: string;
  dateFrom: string;
  dateTo: string;
  duration: number;
  status: number; // todo: status
  price: number;
  currency: Currency;
}
