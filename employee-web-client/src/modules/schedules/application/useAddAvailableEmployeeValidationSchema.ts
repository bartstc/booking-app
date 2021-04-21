import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { DeepNullable } from 'types';

import { IAddAvailableEmployeeDto } from './types';

export const useAddAvailableEmployeeValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();

  return yup.object().shape<{ availabilities: DeepNullable<IAddAvailableEmployeeDto>[] }>({
    availabilities: yup.array().of(
      yup.object().shape({
        creatorId: yup.string(),
        employeeId: yup.string(),
        startTime: yup.string().required(requiredMessage).nullable(true),
        endTime: yup.string().required(requiredMessage).nullable(true),
      }),
    ) as yup.Schema<DeepNullable<IAddAvailableEmployeeDto>[]>,
  });
};
