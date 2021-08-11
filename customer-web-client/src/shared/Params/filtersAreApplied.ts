import { isEmpty, omit } from 'lodash';
import { IQueryParams } from '../../types';

export const filtersAreApplied = <Params extends IQueryParams>(params: Params) => {
  return !isEmpty(omit(params, ['offset', 'order', 'limit']));
};
