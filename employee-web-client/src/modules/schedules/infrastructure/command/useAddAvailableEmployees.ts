import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { accessibilityHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { IAddAvailableEmployeeDto } from '../../application/types';
import { availableEmployeesQueryKey } from '../query';

export const useAddAvailableEmployees = (facilityId: string, scheduleId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, { availabilities: IAddAvailableEmployeeDto[] }>(model =>
    accessibilityHttpService.patch(`facilities/${facilityId}/schedules/${scheduleId}`, model),
  );

  const handler = (model: { availabilities: IAddAvailableEmployeeDto[] }) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(availableEmployeesQueryKey(facilityId, scheduleId));
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
