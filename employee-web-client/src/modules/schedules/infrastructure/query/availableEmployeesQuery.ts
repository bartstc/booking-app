import { accessibilityHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';
import { buildUrl } from 'utils';

import { IAvailableEmployeeCollection, IAvailableEmployeesQueryParams } from '../../application/types';

export const availableEmployeesQueryKey = (facilityId: string, scheduleId: string, params: IAvailableEmployeesQueryParams) => [
  `facilities/${facilityId}/schedules/${scheduleId}/availabilities`,
  ServiceType.Accessibility,
];

export const useAvailableEmployeesQuery = (facilityId: string, scheduleId: string, params: IAvailableEmployeesQueryParams) => {
  return useSuspense(availableEmployeesQueryKey(facilityId, scheduleId, params), () =>
    accessibilityHttpService.get<IAvailableEmployeeCollection>(buildUrl(`facilities/${facilityId}/schedules/${scheduleId}/availabilities`)),
  ).data;
};
