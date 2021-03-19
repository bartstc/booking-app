import { accessibilityHttpService, ServiceType } from 'utils/http';

import { ISchedule } from '../../types';

export const getScheduleKey = (facilityId: string, scheduleId: string) => [
  `facilities/${facilityId}/schedules/${scheduleId}`,
  ServiceType.Accessibility,
];

export const getSchedule = (facilityId: string, scheduleId: string) =>
  accessibilityHttpService.get<ISchedule>(`facilities/${facilityId}/schedules/${scheduleId}`);
