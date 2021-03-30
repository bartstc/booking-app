/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { useIntl } from 'react-intl';

import { Currency, DeepNullable } from 'types';
import { TextValidator, useContactPersonValidationSchema, useContactsValidationSchema, useStringSchema } from 'utils/validation';
import { useRequiredFieldMessage } from 'utils/messages';

import { IAddress, BusinessCategoryType, WeekDay, IWorkingHours } from '../../../types';
import { ICreateFacilityFormDto } from '../../../adapter/createFacility';

export const useValidationSchema = () => {
  const { formatMessage } = useIntl();
  const requiredMessage = useRequiredFieldMessage();
  const contactsValidationSchema = useContactsValidationSchema();
  const contactPersonSchema = useContactPersonValidationSchema();
  const string = useStringSchema();

  return yup.object().shape<DeepNullable<ICreateFacilityFormDto>>({
    facilityName: string.min(1).max(999),
    facilityDescription: yup.string().min(1, requiredMessage).max(9999),
    slug: string.max(50),
    currency: string.oneOf(Object.values(Currency), requiredMessage) as yup.Schema<Currency>,
    contactPerson: contactPersonSchema,
    address: yup.object().shape<IAddress>({
      street: yup.string().max(300).trim().required(requiredMessage),
      countryCode: yup.string().max(2).trim().required(requiredMessage),
      province: yup.string().max(100).trim().nullable(true) as any,
      city: yup.string().max(100).trim().required(requiredMessage),
      postCode: yup.string().max(6).trim().required(requiredMessage),
    }) as yup.ObjectSchema<IAddress>,
    contacts: contactsValidationSchema,
    mainBusinessCategory: string.oneOf(Object.values(BusinessCategoryType), requiredMessage),
    subordinateBusinessCategories: yup
      .array()
      .nullable(true)
      .required(requiredMessage)
      .of(yup.string().oneOf(Object.values(BusinessCategoryType), requiredMessage)) as yup.Schema<BusinessCategoryType[]>,
    availability: yup
      .array()
      .required(requiredMessage)
      .of(
        yup.object().shape<{ dayName: WeekDay; hours: IWorkingHours }>({
          dayName: string.oneOf(Object.values(WeekDay), requiredMessage),
          hours: yup.object().shape<IWorkingHours>({
            until: yup
              .string()
              .required(requiredMessage)
              .test('valid hour format', formatMessage({ id: 'invalid-time-format', defaultMessage: 'Invalid format' }), hour => {
                if (!hour) return false;
                return TextValidator.validateHour(hour);
              }),
            to: yup
              .string()
              .required(requiredMessage)
              .test('valid hour format', formatMessage({ id: 'invalid-time-format', defaultMessage: 'Invalid format' }), hour => {
                if (!hour) return false;
                return TextValidator.validateHour(hour);
              }),
          }) as yup.Schema<IWorkingHours>,
        }),
      ) as yup.Schema<any>,
  });
};
