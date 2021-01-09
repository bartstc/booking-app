import { buildUrl } from 'utils';

import { httpService } from '../../../utils/http-service';
import { CustomerCollection } from '../types';

export const getCustomersKey = (facilityId: string, params: object) => ['customers', facilityId, params];

export const getCustomers = (facilityId: string, params: object) =>
  httpService.get<CustomerCollection>(buildUrl(`facilities/${facilityId}/customers`, params));
