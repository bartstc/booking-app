import * as yup from 'yup';

import { contactPersonSchema, contactsSchema } from 'shared/domain/schemas';
import { TextValidator } from 'shared/core';

import {
  BusinessCategoryDegreeType,
  BusinessCategoryType,
  Currency,
  IAddress,
  IBusinessCategory,
  IWorkingDay,
  IWorkingHours,
  WeekDay,
} from 'modules/facilities/domain/types';
import { CreateFacilityDto } from 'modules/facilities/application/command/createFacility';

export const createFacilitySchema = yup.object().shape<CreateFacilityDto>({
  facilityName: yup.string().required().min(1).max(999),
  facilityDescription: yup.string().min(1).max(9999),
  slug: yup.string().required().min(1).max(50),
  currency: yup
    .string()
    .required()
    .oneOf(Object.values(Currency)) as yup.Schema<Currency>,
  contactPerson: contactPersonSchema,
  address: yup.object().shape<IAddress>({
    street: yup.string().max(300).trim().required(),
    province: yup.string().max(100).trim().nullable(true),
    city: yup.string().max(100).trim().required(),
    postCode: yup.string().max(60).trim().required(),
  }),
  contacts: contactsSchema,
  businessCategories: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object().shape<IBusinessCategory>({
        type: yup
          .string()
          .required()
          .oneOf(
            Object.values(BusinessCategoryType),
          ) as yup.Schema<BusinessCategoryType>,
        degree: yup
          .string()
          .required()
          .oneOf(
            Object.values(BusinessCategoryDegreeType),
          ) as yup.Schema<BusinessCategoryDegreeType>,
      }),
    ),
  availability: yup
    .array()
    .required()
    .of(
      yup.object().shape<IWorkingDay>({
        dayName: yup.string().required().oneOf(Object.values(WeekDay)),
        hours: yup
          .array<IWorkingHours>()
          .required()
          .min(1)
          .test('is range', 'until and to values are required', (hours) => {
            return hours.every((range) => Object.values(range).length === 2);
          })
          .test('valid hour format', 'invalid hour date type', (hours) => {
            return hours
              .map((range) => [range.until, range.to])
              .flat()
              .every((value) => TextValidator.validateHour(value));
          }),
      }),
    ),
});
