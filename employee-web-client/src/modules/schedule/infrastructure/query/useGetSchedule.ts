import { managementHttpService } from 'utils/http';

import { ISchedule } from '../../types';

export const getScheduleKey = (facilityId: string, scheduleId: string) => [`facilities/${facilityId}/schedules/${scheduleId}`];

export const getSchedule = (facilityId: string, scheduleId: string) =>
  managementHttpService.get<ISchedule>(`facilities/${facilityId}/schedules/${scheduleId}`);
