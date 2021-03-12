import { managementHttpService, ServiceType } from 'utils/http';
import { buildUrl } from 'utils';

import { IFacilityCollection, IFacilityCollectionQueryParams } from '../../types';

export const getFacilitiesKey = (enterpriseId: string, params?: IFacilityCollectionQueryParams) => [
  `enterprises/${enterpriseId}/facilities`,
  ServiceType.Management,
  params,
];

export const getFacilities = (enterpriseId: string, params?: IFacilityCollectionQueryParams) =>
  managementHttpService.get<IFacilityCollection>(buildUrl(`enterprises/${enterpriseId}/facilities`, params));
