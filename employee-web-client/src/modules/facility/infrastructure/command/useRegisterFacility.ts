import { useQueryClient } from 'react-query';

import { Logger, LogLevel } from 'utils/logger';
import { managementHttpService } from 'utils/http';
import { useMutation } from 'shared/Suspense';
import { employeeByEmailQueryKey } from 'modules/employees/infrastructure/query';

import { CreateFacilityDto, CreateFacilityFormDto } from '../../application/types';
import { CreateFacilityMapper } from '../../application';
import { IEmployee } from '../../../employees/application/types';

export const useRegisterFacility = (enterpriseId: string, creatorId: string, employeeEmail: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<{ facilityId: string }, CreateFacilityDto>(model => {
    return managementHttpService.post(`enterprises/${enterpriseId}/facilities`, { ...model, creatorId });
  });

  const handler = (model: CreateFacilityFormDto) => {
    return mutateAsync(CreateFacilityMapper.formToDto(model))
      .then(async ({ facilityId }) => {
        await queryClient.setQueryData<IEmployee | undefined>(employeeByEmailQueryKey(employeeEmail), data => {
          if (!data) return;

          return {
            ...data,
            scope: {
              ...data.scope,
              facilityIds: [facilityId],
            },
          };
        });
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
