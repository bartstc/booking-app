import { Logger, LogLevel } from 'utils/logger';
import { managementHttpService } from 'utils/http';
import { useMutation } from 'shared/Suspense';

import { CreateFacilityDto, CreateFacilityFormDto } from '../../application/types';
import { CreateFacilityMapper } from '../../application';

export const useCreateFacility = (enterpriseId: string, creatorId: string, onSuccess?: (facilityId: string) => Promise<void>) => {
  const { mutateAsync, isLoading } = useMutation<{ facilityId: string }, CreateFacilityDto>(model => {
    return managementHttpService.post(`enterprises/${enterpriseId}/facilities`, { ...model, creatorId });
  });

  const handler = (model: CreateFacilityFormDto) => {
    return mutateAsync(CreateFacilityMapper.formToDto(model))
      .then(async ({ facilityId }) => {
        if (onSuccess) await onSuccess(facilityId);
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
