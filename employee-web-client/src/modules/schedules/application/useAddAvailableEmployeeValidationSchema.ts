import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { DeepNullable } from 'types';

import { IAddAvailableEmployeeDto } from './types';

export const useAddAvailableEmployeeValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();

  return yup.object().shape<DeepNullable<IAddAvailableEmployeeDto>>({
    creatorId: yup.string().required(),
    employeeId: yup.string().required(requiredMessage).nullable(true),
    startTime: yup.string().required(requiredMessage).nullable(true),
    endTime: yup.string().required(requiredMessage).nullable(true),
  });
};
