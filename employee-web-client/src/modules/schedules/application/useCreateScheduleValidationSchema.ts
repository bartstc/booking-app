import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { DeepNullable } from 'types';

import { ICreateScheduleDto } from './types';
import { useAddAvailableEmployeeValidationSchema } from './useAddAvailableEmployeeValidationSchema';

export const useCreateScheduleValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();
  const availableEmployeeSchema = useAddAvailableEmployeeValidationSchema();

  return yup.object().shape<DeepNullable<ICreateScheduleDto>>({
    creatorId: yup.string().required(),
    name: yup.string().required(requiredMessage).min(1).max(999),
    startDate: yup.string().required(requiredMessage).nullable(true),
    endDate: yup.string().required(requiredMessage).nullable(true),
    availabilities: yup.array().of(availableEmployeeSchema),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};
