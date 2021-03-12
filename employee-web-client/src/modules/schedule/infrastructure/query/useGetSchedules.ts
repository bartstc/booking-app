import { accessibilityHttpService, ServiceType } from 'utils/http';

import { IScheduleCollection } from '../../types';

export const getSchedulesKey = (facilityId: string) => [`facilities/${facilityId}/schedules`, ServiceType.Accessibility];

const mockedData: IScheduleCollection = {
  meta: {
    limit: 10,
    offset: 0,
    total: 10,
  },
  collection: [
    {
      name: 'First schedule ever',
      endDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      creationDate: new Date().toISOString(),
      availabilities: [],
    },
  ],
};

// export const getSchedules = (facilityId: string) => accessibilityHttpService.get<IScheduleCollection>(`facilities/${facilityId}/schedules`);

export const getSchedules = (facilityId: string) => new Promise<IScheduleCollection>(resolve => resolve(mockedData));
