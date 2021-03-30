import { useQueryClient } from 'react-query';

import { Logger, LogLevel } from 'utils/logger';
import { managementHttpService } from 'utils/http';
import { useMutation } from 'shared/Suspense';

import { CreateFacilityMapper, ICreateFacilityDto, ICreateFacilityFormDto } from '../../adapter/createFacility';
import { IFacility } from '../../types';
import { facilityQueryKey } from '../query';

export const useCreateFacility = (enterpriseId: string, facilityId?: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, ICreateFacilityDto>(model => {
    if (facilityId) {
      return managementHttpService.put(`enterprises/${enterpriseId}/facilities/${facilityId}`, model);
    }
    return managementHttpService.post(`enterprises/${enterpriseId}/facilities`, model);
  });

  const handler = (model: ICreateFacilityFormDto) => {
    return mutateAsync(CreateFacilityMapper.formToDto(model))
      .then(async () => {
        if (facilityId) {
          await queryClient.setQueryData<IFacility | undefined>(facilityQueryKey(facilityId), input => {
            if (!input) return;

            return { ...input, ...CreateFacilityMapper.formToDto(model) };
          });
        }
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
