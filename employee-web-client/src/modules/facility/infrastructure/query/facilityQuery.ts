import { managementHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IFacility } from '../../types';

export const facilityQueryKey = (facilitySlug: string) => [`facilities/slug/${facilitySlug}`, ServiceType.Management];

export const facilityQuery = (facilitySlug: string) => managementHttpService.get<IFacility>(`facilities/slug/${facilitySlug}`);

export const useFacilityQuery = (facilitySlug: string) => {
  return useSuspense(facilityQueryKey(facilitySlug), () => facilityQuery(facilitySlug)).data;
};
