import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { accessibilityHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { IAddAvailabilitiesDto, IAvailableEmployeesQueryParams } from '../../application/types';
import { availableEmployeesQueryKey } from '../query';

export const useAddAvailableEmployees = (facilityId: string, scheduleId: string, params: IAvailableEmployeesQueryParams) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, IAddAvailabilitiesDto>(model =>
    accessibilityHttpService.patch(`facilities/${facilityId}/schedules/${scheduleId}/availabilities`, model),
  );

  const handler = (model: IAddAvailabilitiesDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(availableEmployeesQueryKey(facilityId, scheduleId, params));
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
