import { managementHttpService, ServiceType } from 'utils/http';

import { ICustomer } from '../../application/types';

export const customerQueryKey = (facilityId: string, customerId: string) => [
  `facilities/${facilityId}/customers/${customerId}`,
  ServiceType.Management,
];

export const customerQuery = (facilityId: string, customerId: string) =>
  managementHttpService.get<ICustomer>(`facilities/${facilityId}/customers/${customerId}`);
