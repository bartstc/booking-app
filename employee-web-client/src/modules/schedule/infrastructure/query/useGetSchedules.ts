import { accessibilityHttpService, ServiceType } from 'utils/http';

import { IScheduleCollection } from '../../types';

export const getSchedulesKey = (facilityId: string) => [`facilities/${facilityId}/schedules`, ServiceType.Accessibility];

export const getSchedules = (facilityId: string) => accessibilityHttpService.get<IScheduleCollection>(`facilities/${facilityId}/schedules`);
