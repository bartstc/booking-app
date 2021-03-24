import { managementHttpService, ServiceType } from 'utils/http';
import { buildUrl } from 'utils';

import { IFacilityCollection, IFacilityCollectionQueryParams } from '../../types';

export const facilitiesQueryKey = (enterpriseId: string, params?: IFacilityCollectionQueryParams) => [
  `enterprises/${enterpriseId}/facilities`,
  ServiceType.Management,
  params,
];

export const facilitiesQuery = (enterpriseId: string, params?: IFacilityCollectionQueryParams) =>
  managementHttpService.get<IFacilityCollection>(buildUrl(`enterprises/${enterpriseId}/facilities`, params));
