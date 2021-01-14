import { QueryParams } from 'shared/core';

export enum CustomerCollectionOrder {
  FullName = 'fullName',
  BirthDate = 'birthDate',
}

export interface CustomerCollectionQueryParams extends QueryParams {
  fullName?: string;
}
