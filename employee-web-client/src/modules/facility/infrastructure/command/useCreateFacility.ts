import { useQueryClient } from 'react-query';

import { Logger, LogLevel } from 'utils/logger';
import { managementHttpService } from 'utils/http';
import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { facilitiesQueryKey, facilityQueryKey } from '../query';
import { CreateFacilityDto, CreateFacilityFormDto, IFacility, IFacilityCollectionQueryParams } from '../../application/types';
import { CreateFacilityMapper } from '../../application';

export const useCreateFacility = (enterpriseId: string, facilityId?: string) => {
  const { params } = useQueryParams<IFacilityCollectionQueryParams>();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, CreateFacilityDto>(model => {
    if (facilityId) {
      return managementHttpService.put(`enterprises/${enterpriseId}/facilities/${facilityId}`, model);
    }
    return managementHttpService.post(`enterprises/${enterpriseId}/facilities`, model);
  });

  const handler = (model: CreateFacilityFormDto) => {
    return mutateAsync(CreateFacilityMapper.formToDto(model))
      .then(async () => {
        if (facilityId) {
          await queryClient.setQueryData<IFacility | undefined>(facilityQueryKey(facilityId), input => {
            if (!input) return;

            return { ...input, ...CreateFacilityMapper.formToDto(model) };
          });
        }
        await queryClient.invalidateQueries(facilitiesQueryKey(enterpriseId, params));
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
