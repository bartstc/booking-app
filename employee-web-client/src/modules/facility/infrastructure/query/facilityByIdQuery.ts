import { managementHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IFacility } from '../../application/types';

export const facilityByIdQueryKey = (facilityId: string) => [`facilities/${facilityId}`, ServiceType.Management];

export const facilityByIdQuery = (facilityId: string) => managementHttpService.get<IFacility>(`facilities/${facilityId}`);

export const useFacilityByIdQuery = (facilityId: string) => {
  return useSuspense(facilityByIdQueryKey(facilityId), () => managementHttpService.get<IFacility>(`facilities/${facilityId}`)).data;
};
