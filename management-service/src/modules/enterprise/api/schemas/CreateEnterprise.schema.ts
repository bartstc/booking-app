import * as yup from 'yup';

import { TextValidator } from 'shared/core';
import { contactPersonSchema } from 'shared/domain/schemas';

import { CreateEnterpriseDto } from 'modules/enterprise/application/command/createEnterprise';

export const createEnterpriseSchema = yup.object().shape<CreateEnterpriseDto>({
  enterpriseName: yup.string().required().min(1).max(999),
  enterpriseDescription: yup.string().required().min(1).max(9999),
  enterpriseUrl: yup
    .string()
    .required()
    .test('validUrlTest', 'Invalid url format', (url) => {
      return TextValidator.validateWebURL(url);
    }),
  contactPerson: contactPersonSchema,
});
