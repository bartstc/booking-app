import { useMutation } from 'react-query';

import { httpService } from 'utils/http-service';

import { IAddEmployeeDto } from '../../dto';

export const useAddEmployee = (facilityId: string) => {
  const { mutateAsync, isLoading } = useMutation<void, Error, IAddEmployeeDto>(model =>
    httpService.post(`facilities/${facilityId}/employees`, model),
  );

  const handler = (model: IAddEmployeeDto) => {
    return mutateAsync(model).then(() => {
      // todo: mutate query
    });
  };

  return [handler, isLoading] as const;
};
