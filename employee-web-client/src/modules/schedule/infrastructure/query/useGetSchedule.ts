import { httpService } from 'utils/http';

import { ISchedule } from '../../types';

export const getScheduleKey = (facilityId: string, scheduleId: string) => [`facilities/${facilityId}/schedules/${scheduleId}`];

export const getSchedule = (facilityId: string, scheduleId: string) =>
  httpService.get<ISchedule>(`facilities/${facilityId}/schedules/${scheduleId}`);
