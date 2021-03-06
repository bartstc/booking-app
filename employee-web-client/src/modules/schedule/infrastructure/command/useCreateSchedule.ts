// import { useQueryClient } from 'react-query';
import { useMutation } from 'shared/Suspense';
import { httpService } from 'utils/http';

import { ICreateScheduleDto } from '../../dto';

export const useCreateSchedule = (facilityId: string) => {
  // const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, ICreateScheduleDto>(model =>
    httpService.post(`facilities/${facilityId}/schedules`, model),
  );

  const handler = (model: ICreateScheduleDto) => {
    return mutateAsync(model)
      .then(async () => {
        // todo: invalidate schedules list query
        // await queryClient.invalidateQueries();
      })
      .catch(e => {
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
