import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { accessibilityHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { ICreateScheduleDto } from '../../dto';
import { getSchedulesKey } from '../query';

export const useCreateSchedule = (facilityId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, ICreateScheduleDto>(model =>
    accessibilityHttpService.post(`facilities/${facilityId}/schedules`, model),
  );

  const handler = (model: ICreateScheduleDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(getSchedulesKey(facilityId));
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
