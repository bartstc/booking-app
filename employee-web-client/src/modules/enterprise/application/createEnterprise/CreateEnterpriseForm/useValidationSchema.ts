import * as yup from 'yup';

import { IContactPerson } from 'types';
import { TextValidator, useContactPersonValidationSchema } from 'utils/validation';
import { useInvalidFormatFieldMessage, useRequiredFieldMessage } from 'utils/messages';

import { ICreateEnterpriseDto } from '../../../dto';

export const useValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();
  const invalidFormatMessage = useInvalidFormatFieldMessage();
  const contactPersonSchema = useContactPersonValidationSchema();

  return yup.object().shape<ICreateEnterpriseDto>({
    enterpriseName: yup.string().required(requiredMessage).min(1).max(999),
    enterpriseDescription: yup.string().required(requiredMessage).min(1).max(9999),
    enterpriseUrl: yup
      .string()
      .required(requiredMessage)
      .test('validUrlTest', invalidFormatMessage, url => {
        return TextValidator.validateWebURL(url!);
      }),
    contactPerson: contactPersonSchema as yup.Schema<IContactPerson>,
  });
};
