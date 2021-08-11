import { stringify } from 'query-string';
import { isEmpty } from 'lodash';

import { IQueryParams } from '../types';

export const buildUrl = <Params = IQueryParams>(path: string, params?: Params) => {
  if (isEmpty(params)) {
    return path;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return `${path}?${stringify(params as any, { arrayFormat: 'comma' })}`;
};
