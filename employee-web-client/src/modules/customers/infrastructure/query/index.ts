import { buildUrl } from 'utils';
import { httpService } from 'utils/http-service';

import { ICustomerCollection } from '../../types';

export const getCustomersKey = (facilityId: string, params: object) => ['customers', facilityId, params];

export const getCustomers = (facilityId: string, params: object) =>
  httpService.get<ICustomerCollection>(buildUrl(`facilities/${facilityId}/customers`, params));
