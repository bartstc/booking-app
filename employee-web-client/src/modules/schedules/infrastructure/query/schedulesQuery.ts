import { accessibilityHttpService, ServiceType } from 'utils/http';

import { IScheduleCollection } from '../../application/types';
import dayjs from 'dayjs';

export const mockedSchedules: IScheduleCollection = {
  meta: {
    offset: 0,
    limit: 10,
    total: 1,
  },
  collection: [
    {
      scheduleId: '123',
      creationDate: dayjs().toDate().toString(),
      startDate: dayjs().add(1, 'day').toDate().toString(),
      endDate: dayjs().add(15, 'day').toDate().toString(),
      name: 'Mocked schedule',
      availabilities: [
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '8e4569eb-e8b9-4072-ab14-e16b4fc1fe6a',
          priority: 0,
          startTime: dayjs().add(1, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(1, 'day').hour(17).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '8e4569eb-e8b9-4072-ab14-e16b4fc1fe6a',
          priority: 0,
          startTime: dayjs().add(2, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(2, 'day').hour(10).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '8e4569eb-e8b9-4072-ab14-e16b4fc1fe6a',
          priority: 0,
          startTime: dayjs().add(2, 'day').hour(11).minute(0).toDate().toString(),
          endTime: dayjs().add(2, 'day').hour(18).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '8e4569eb-e8b9-4072-ab14-e16b4fc1fe6a',
          priority: 0,
          startTime: dayjs().add(3, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(3, 'day').hour(10).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '8e4569eb-e8b9-4072-ab14-e16b4fc1fe6a',
          priority: 0,
          startTime: dayjs().add(4, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(4, 'day').hour(10).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '6da99b33-ffa6-4938-97df-764b10c38003',
          priority: 0,
          startTime: dayjs().add(1, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(1, 'day').hour(17).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '6da99b33-ffa6-4938-97df-764b10c38003',
          priority: 0,
          startTime: dayjs().add(2, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(2, 'day').hour(10).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '6da99b33-ffa6-4938-97df-764b10c38003',
          priority: 0,
          startTime: dayjs().add(2, 'day').hour(11).minute(0).toDate().toString(),
          endTime: dayjs().add(2, 'day').hour(18).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '6da99b33-ffa6-4938-97df-764b10c38003',
          priority: 0,
          startTime: dayjs().add(3, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(3, 'day').hour(10).minute(0).toDate().toString(),
        },
        {
          creationDate: dayjs().toDate().toString(),
          creatorId: '1',
          employeeId: '6da99b33-ffa6-4938-97df-764b10c38003',
          priority: 0,
          startTime: dayjs().add(4, 'day').hour(9).minute(0).toDate().toString(),
          endTime: dayjs().add(4, 'day').hour(10).minute(0).toDate().toString(),
        },
      ],
    },
  ],
};

export const schedulesQueryKey = (facilityId: string) => [`facilities/${facilityId}/schedules`, ServiceType.Accessibility];

export const schedulesQuery = (facilityId: string) => Promise.resolve<IScheduleCollection>(mockedSchedules);

// export const schedulesQuery = (facilityId: string) =>
//   accessibilityHttpService.get<IScheduleCollection>(`facilities/${facilityId}/schedules`);
