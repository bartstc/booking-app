import { managementHttpService, ServiceType } from 'utils/http';
import { buildUrl } from 'utils';
import { useSuspense } from 'shared/Suspense';

import { IFacilityCollection, IFacilityCollectionQueryParams } from '../../application/types';

export const facilitiesQueryKey = (
  enterpriseId: string,
  params?: IFacilityCollectionQueryParams,
): [string, ServiceType, IFacilityCollectionQueryParams | undefined] => [
  `enterprises/${enterpriseId}/facilities`,
  ServiceType.Management,
  params,
];

export const facilitiesQuery = (enterpriseId: string, params?: IFacilityCollectionQueryParams) =>
  managementHttpService.get<IFacilityCollection>(buildUrl(`enterprises/${enterpriseId}/facilities`, params));

export const useFacilitiesQuery = (enterpriseId: string, params?: IFacilityCollectionQueryParams) => {
  return useSuspense(facilitiesQueryKey(enterpriseId, params), () => facilitiesQuery(enterpriseId, params)).data;
};
