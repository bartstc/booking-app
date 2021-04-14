import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { accessibilityHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { dayjs } from 'utils/dayjs';

import { schedulesQueryKey } from '../query';
import { IAddAvailableEmployeeDto, ICreateScheduleDto } from '../../application/types';

export const useCreateSchedule = (facilityId: string, scheduleId?: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, ICreateScheduleDto & { availabilities: IAddAvailableEmployeeDto[] }>(model => {
    return scheduleId
      ? accessibilityHttpService.put(`facilities/${facilityId}/schedules/${scheduleId}`, model)
      : accessibilityHttpService.post(`facilities/${facilityId}/schedules`, model);
  });

  const handler = (model: ICreateScheduleDto) => {
    return mutateAsync({
      ...model,
      // todo: remove mocked first accessible employee
      availabilities: [
        {
          employeeId: model.creatorId,
          creatorId: model.creatorId,
          endTime: dayjs().add(3, 'day').toDate().toISOString(),
          startTime: dayjs().add(2, 'day').toDate().toISOString(),
        },
      ],
    })
      .then(async () => {
        await queryClient.invalidateQueries(schedulesQueryKey(facilityId));
      })
      .catch(e => {
        Logger.log({
          name: e.name,
          message: JSON.stringify(e),
          level: LogLevel.Error,
        });
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
