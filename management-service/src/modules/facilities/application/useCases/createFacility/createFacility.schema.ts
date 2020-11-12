import * as yup from 'yup';

import { contactPersonSchema } from 'shared/domain/schemas';
import { ContactType, IContact } from 'shared/domain/types';
import { TextValidator } from 'shared/core';

import { CreateFacilityDto } from './createFacility.dto';
import {
  BusinessCategoryDegreeType,
  BusinessCategoryType,
  IAddress,
  IBusinessCategory,
  IWorkingDay,
  IWorkingHours,
  WeekDay,
} from '../../../domain/types';

export const createFacilitySchema = yup.object().shape<CreateFacilityDto>({
  facilityName: yup
    .string()
    .required()
    .min(1)
    .max(999),
  facilityDescription: yup
    .string()
    .required()
    .min(1)
    .max(9999),
  contactPerson: contactPersonSchema,
  address: yup.object().shape<IAddress>({
    street: yup
      .string()
      .max(300)
      .trim()
      .required(),
    countryCode: yup
      .string()
      .max(2)
      .trim()
      .required(),
    province: yup
      .string()
      .max(100)
      .trim()
      .required(),
    city: yup
      .string()
      .max(100)
      .trim()
      .required(),
    postCode: yup
      .string()
      .max(60)
      .trim()
      .required(),
    houseNumber: yup
      .string()
      .max(50)
      .trim()
      .required(),
    flatNumber: yup
      .string()
      .max(50)
      .trim()
      .nullable(true),
  }),
  contacts: yup.array().of(
    yup.object().shape<IContact>({
      type: yup.string().required() as yup.Schema<ContactType>,
      value: yup
        .string()
        .trim()
        .required(),
    }),
  ),
  businessCategories: yup.array().of(
    yup.object().shape<IBusinessCategory>({
      type: yup.string().required() as yup.Schema<BusinessCategoryType>,
      degree: yup.string().required() as yup.Schema<BusinessCategoryDegreeType>,
    }),
  ),
  availability: yup.array().of(
    yup.object().shape<IWorkingDay>({
      dayName: yup
        .string()
        .required()
        .oneOf(Object.values(WeekDay)),
      hours: yup
        .array<IWorkingHours>()
        .required()
        .min(1)
        .test('is range', 'until and to values are required', hours => {
          return hours.every(range => Object.values(range).length === 2);
        })
        .test('valid hour format', 'invalid hour date type', hours => {
          return hours
            .map(range => [range.until, range.to])
            .flat()
            .every(value => TextValidator.validateHour(value));
        }),
    }),
  ),
});
