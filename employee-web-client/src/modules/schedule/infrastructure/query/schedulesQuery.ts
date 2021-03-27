import { accessibilityHttpService, ServiceType } from 'utils/http';

import { IScheduleCollection } from '../../types';

export const schedulesQueryKey = (facilityId: string) => [`facilities/${facilityId}/schedules`, ServiceType.Accessibility];

export const schedulesQuery = (facilityId: string) =>
  accessibilityHttpService.get<IScheduleCollection>(`facilities/${facilityId}/schedules`);
