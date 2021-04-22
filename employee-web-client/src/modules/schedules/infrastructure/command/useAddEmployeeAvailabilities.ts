import { useQueryClient } from 'react-query';
import { Dayjs } from 'dayjs';

import { useMutation } from 'shared/Suspense';
import { accessibilityHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { IAddAvailabilitiesDto, IAddAvailabilityFormValues, IAvailableEmployeesQueryParams } from '../../application/types';
import { availabilitiesQueryKey } from '../query';

interface IProps {
  facilityId: string;
  scheduleId: string;
  employeeId: string;
  creatorId: string;
  dayDate: Dayjs;
  params: IAvailableEmployeesQueryParams;
}

export const useAddEmployeeAvailabilities = ({ scheduleId, facilityId, dayDate, params, employeeId, creatorId }: IProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, IAddAvailabilitiesDto>(model =>
    accessibilityHttpService.patch(`facilities/${facilityId}/schedules/${scheduleId}/availabilities`, model),
  );

  const handler = (model: IAddAvailabilityFormValues[]) => {
    return mutateAsync({
      dateFrom: dayDate.format('YYYY-MM-DDT00:00:00.000'),
      dateTo: dayDate.format('YYYY-MM-DDT23:59:59.000'),
      availabilities: model.map(availability => ({
        ...availability,
        creatorId,
        employeeId,
      })),
    })
      .then(async () => {
        await queryClient.invalidateQueries(availabilitiesQueryKey(facilityId, scheduleId, params));
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
