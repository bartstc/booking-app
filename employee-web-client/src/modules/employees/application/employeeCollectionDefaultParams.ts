import { DEFAULT_PARAMS } from 'utils/constant';

import { IEmployeeCollectionQueryParams } from './types';

export const EMPLOYEE_COLLECTION_DEFAULT_PARAMS: IEmployeeCollectionQueryParams = {
  order: 'status',
  ...DEFAULT_PARAMS,
};
