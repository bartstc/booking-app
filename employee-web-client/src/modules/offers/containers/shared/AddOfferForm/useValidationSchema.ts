import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { Currency } from 'types';

import { IAddOfferDto, IPrice, PriceModel } from '../../../application/types';

export const useValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();

  return yup.object().shape<IAddOfferDto>({
    offerName: yup.string().required(requiredMessage).min(1).max(999),
    duration: yup
      .number()
      .typeError(requiredMessage)
      .min(1, requiredMessage)
      .max(60 * 24)
      .required(requiredMessage),
    price: yup.object().shape<IPrice>({
      value: yup.string().required(requiredMessage),
      currency: yup.string().required(requiredMessage).oneOf(Object.values(Currency)) as yup.Schema<Currency>,
      type: yup
        .string()
        .required(requiredMessage)
        .nullable(true)
        .oneOf(Object.values(PriceModel), requiredMessage) as yup.Schema<PriceModel>,
    }) as yup.Schema<IPrice>,
  });
};
