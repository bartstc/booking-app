import * as yup from 'yup';

import { AddOfferDto } from 'modules/facilities/application/command/addOffer';
import { Currency, IPrice, PriceModel } from 'modules/facilities/domain/types';

export const addOfferSchema = yup.object().shape<AddOfferDto>({
  offerName: yup.string().required().min(1).max(999),
  duration: yup
    .number()
    .max(60 * 24)
    .required(),
  price: yup.object().shape<IPrice>({
    value: yup.string().required(),
    currency: yup
      .string()
      .required()
      .oneOf(Object.values(Currency)) as yup.Schema<Currency>,
    type: yup
      .string()
      .required()
      .oneOf(Object.values(PriceModel)) as yup.Schema<PriceModel>,
  }),
});
