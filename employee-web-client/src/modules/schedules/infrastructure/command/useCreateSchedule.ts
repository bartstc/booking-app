import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { accessibilityHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { dayjs } from 'utils/dayjs';

import { schedulesQueryKey } from '../query';
import { ICreateScheduleDto } from '../../application/types';

export const useCreateSchedule = (facilityId: string, scheduleId?: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, ICreateScheduleDto>(model => {
    return scheduleId
      ? accessibilityHttpService.put(`facilities/${facilityId}/schedules/${scheduleId}`, model)
      : accessibilityHttpService.post(`facilities/${facilityId}/schedules`, model);
  });

  const handler = (model: ICreateScheduleDto) => {
    return mutateAsync({
      creatorId: model.creatorId,
      name: model.name,
      startDate: dayjs(model.startDate).format('YYYY-MM-DDT00:00:00.000'),
      endDate: dayjs(model.endDate).format('YYYY-MM-DDT00:00:00.000'),
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
