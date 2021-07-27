import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';
import { ContextType } from 'types';

import { employeeByEmailQueryKey } from '../query';
import { EmployeeStatus, ICreateOwnerEmployeeDto, IEmployee } from '../../application/types';

export const useCreateOwnerEmployee = (enterpriseId: string, ownerEmail: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<{ employeeId: string }, ICreateOwnerEmployeeDto>(model =>
    managementHttpService.post(`enterprises/${enterpriseId}/employees/owner`, model),
  );

  const handler = (model: ICreateOwnerEmployeeDto) => {
    return mutateAsync(model)
      .then(async ({ employeeId }) => {
        await queryClient.setQueryData<IEmployee | undefined>(
          employeeByEmailQueryKey(ownerEmail),
          () =>
            ({
              employeeId,
              enterpriseId,
              name: model.employeeName,
              contacts: model.contacts,
              position: model.position,
              status: EmployeeStatus.Active,
              scope: {
                employeeId,
                enterpriseId,
                facilityIds: [],
                activeFacilityId: null,
                contextType: ContextType.Employee,
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any),
        );
      })
      .catch(e => {
        if (e.response.message === 'emailInUse') {
          throw new EmailAlreadyExistsError();
        }

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

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email already in use');
  }
}
