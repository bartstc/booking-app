import * as yup from 'yup';

import {
  Currency,
  IOfferVariant,
  IPrice,
  PriceModel,
} from '../../../domain/types';
import { AddOfferDto } from './AddOffer.dto';

export const addOfferSchema = yup.object().shape<AddOfferDto>({
  offerName: yup
    .string()
    .required()
    .min(1)
    .max(999),
  variants: yup
    .array()
    .required()
    .min(1)
    .max(1)
    .of(
      yup.object().shape<IOfferVariant>({
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
      }),
    ),
});
