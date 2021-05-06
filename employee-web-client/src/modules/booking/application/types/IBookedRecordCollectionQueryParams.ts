import { IQueryParams } from 'types';

export interface IBookedRecordCollectionQueryParams extends Partial<IQueryParams> {
  dateFrom?: string;
  dateTo?: string;
}
