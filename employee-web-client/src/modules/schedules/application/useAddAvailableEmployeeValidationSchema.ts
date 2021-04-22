import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { DeepNullable } from 'types';

import { IAddAvailabilityFormValues } from './types';

export const useAddAvailableEmployeeValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();

  return yup.object().shape<{ availabilities: DeepNullable<IAddAvailabilityFormValues>[] }>({
    availabilities: yup.array().of(
      yup.object().shape({
        startTime: yup.string().required(requiredMessage).nullable(true),
        endTime: yup.string().required(requiredMessage).nullable(true),
      }),
    ) as yup.Schema<DeepNullable<IAddAvailabilityFormValues>[]>,
  });
};
