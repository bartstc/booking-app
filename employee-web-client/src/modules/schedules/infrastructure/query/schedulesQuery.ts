import { accessibilityHttpService, ServiceType } from 'utils/http';
import { UseQueryOptions } from 'react-query/types/react/types';

import { useSuspense } from 'shared/Suspense';

import { IScheduleCollection } from '../../application/types';

export const schedulesQueryKey = (facilityId: string) => [`facilities/${facilityId}/schedules`, ServiceType.Accessibility];

export const schedulesQuery = (facilityId: string) =>
  accessibilityHttpService.get<IScheduleCollection>(`facilities/${facilityId}/schedules`);

export const useSchedulesQuery = (facilityId: string, options?: UseQueryOptions) => {
  return useSuspense(schedulesQueryKey(facilityId), () => schedulesQuery(facilityId), options).data;
};
