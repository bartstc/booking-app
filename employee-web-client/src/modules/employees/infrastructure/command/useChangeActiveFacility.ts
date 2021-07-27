import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { managementHttpService } from 'utils/http';

import { useEmployeeContextSelector } from '../../../context';
import { Logger, LogLevel } from '../../../../utils/logger';
import { IEmployee } from '../../application/types';
import { employeeQueryKey } from '../query';

export const useChangeActiveFacility = () => {
  const queryClient = useQueryClient();

  const enterpriseId = useEmployeeContextSelector(state => state.enterpriseId);
  const employeeId = useEmployeeContextSelector(state => state.employeeId);

  const { mutateAsync, isLoading } = useMutation<void, string>(facilityId =>
    managementHttpService.put(`enterprises/${enterpriseId}/employees/${employeeId}/changeActiveFacility`, { facilityId }),
  );

  const handler = (facilityId: string) => {
    return mutateAsync(facilityId)
      .then(async () => {
        queryClient.setQueryData(employeeQueryKey(enterpriseId, employeeId), (data?: IEmployee) => {
          if (!data) {
            throw new Error(`Cache is empty for given key: ${employeeQueryKey(enterpriseId, employeeId)}`);
          }

          return {
            ...data,
            scope: {
              ...data.scope,
              activeFacilityId: facilityId,
            },
          } as IEmployee;
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
