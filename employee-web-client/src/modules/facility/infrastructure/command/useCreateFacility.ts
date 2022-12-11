import { useQueryClient } from 'react-query';

import { Logger, LogLevel } from 'utils/logger';
import { managementHttpService } from 'utils/http';
import { useMutation } from 'shared/Suspense';
import { employeeQueryKey } from 'modules/employees/infrastructure/query';

import { CreateFacilityDto, CreateFacilityFormDto } from '../../application/types';
import { CreateFacilityMapper } from '../../application';

export const useCreateFacility = (enterpriseId: string, creatorId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<{ facilityId: string }, CreateFacilityDto | Partial<CreateFacilityFormDto>>(model => {
    return managementHttpService.post(`enterprises/${enterpriseId}/facilities`, { ...model, creatorId });
  });

  const handler = (model: CreateFacilityFormDto | Partial<CreateFacilityFormDto>) => {
    return mutateAsync(CreateFacilityMapper.formToDto(model as CreateFacilityFormDto))
      .then(async () => {
        await queryClient.invalidateQueries(employeeQueryKey(enterpriseId, creatorId));
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
