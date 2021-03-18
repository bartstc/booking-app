import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { DeepNullable } from 'types';

import { ICreateScheduleDto } from '../../../dto';

export const useValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();

  return yup.object().shape<DeepNullable<ICreateScheduleDto>>({
    name: yup.string().required(requiredMessage).min(1).max(999),
    startDate: yup.string().required(requiredMessage).nullable(true),
    endDate: yup.string().required(requiredMessage).nullable(true),
    availabilities: yup.array().of(
      yup.object().shape({
        employeeId: yup.string().required(requiredMessage).nullable(true),
        startTime: yup.string().required(requiredMessage).nullable(true),
        endTime: yup.string().required(requiredMessage).nullable(true),
      }),
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};
