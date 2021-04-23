import { accessibilityHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';
import { buildUrl } from 'utils';

import { IAvailabilityCollection, IAvailableEmployeesQueryParams } from '../../application/types';

export const availabilitiesQueryKey = (facilityId: string, scheduleId: string, params: IAvailableEmployeesQueryParams) => [
  `facilities/${facilityId}/schedules/${scheduleId}/availabilities`,
  ServiceType.Accessibility,
  params,
];

export const availabilitiesQuery = (facilityId: string, scheduleId: string, params: IAvailableEmployeesQueryParams) => {
  return accessibilityHttpService.get<IAvailabilityCollection>(
    buildUrl(`facilities/${facilityId}/schedules/${scheduleId}/availabilities`, params),
  );
};

export const useAvailabilitiesQuery = (facilityId: string, scheduleId: string, params: IAvailableEmployeesQueryParams) => {
  return useSuspense(availabilitiesQueryKey(facilityId, scheduleId, params), () =>
    accessibilityHttpService.get<IAvailabilityCollection>(
      buildUrl(`facilities/${facilityId}/schedules/${scheduleId}/availabilities`, params),
    ),
  ).data;
};
