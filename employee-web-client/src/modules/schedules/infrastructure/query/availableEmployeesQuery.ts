import { accessibilityHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IAvailableEmployeeCollection } from '../../application/types';

export const availableEmployeesQueryKey = (facilityId: string, scheduleId: string) => [
  `facilities/${facilityId}/schedules/${scheduleId}/availabilities`,
  ServiceType.Accessibility,
];

export const useAvailableEmployeesQuery = (facilityId: string, scheduleId: string) => {
  return useSuspense(availableEmployeesQueryKey(facilityId, scheduleId), () =>
    accessibilityHttpService.get<IAvailableEmployeeCollection>(`facilities/${facilityId}/schedules/${scheduleId}/availabilities`),
  ).data;
};
