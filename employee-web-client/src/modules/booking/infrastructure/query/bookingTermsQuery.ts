import { accessibilityHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';
import dayjs from 'dayjs';

import { IBookingTermCollection, IBookingTermCollectionQueryParams } from '../../application/types';
import { buildUrl } from '../../../../utils';

export const bookingTermsQueryKey = (facilityId: string, params: IBookingTermCollectionQueryParams) => [
  `facilities/${facilityId}/terms`,
  ServiceType.Accessibility,
  params,
];

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const nextMonth = dayjs().add(32, 'day');

const firstEmployeeId = 'f8c40e23-7d02-4895-9bda-cc497911a74b';
const secondEmployeeId = '6da99b33-ffa6-4938-97df-764b10c38003';
const thirdEmployeeId = '8e4569eb-e8b9-4072-ab14-e16b4fc1fe6a';

const dateFormat = 'YYYY-MM-DD';

const mockedBookingTerms: IBookingTermCollection = {
  collection: [
    {
      date: today.hour(8).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId],
      unavailableEmployees: [
        {
          employeeId: secondEmployeeId,
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(8).minute(30).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(10).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(12).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(12).minute(30).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(15).minute(30).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(16).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(16).minute(30).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(17).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(17).minute(30).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(19).minute(30).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: tomorrow.hour(8).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: nextMonth.hour(8).toDate().toString(),
      availableEmployeeIds: [firstEmployeeId, secondEmployeeId],
      unavailableEmployees: [
        {
          employeeId: thirdEmployeeId,
          earlierAvailabilityDate: new Date(`${tomorrow.format(dateFormat)}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow.format(dateFormat)}T10:00:00.000`).toString(),
        },
      ],
    },
  ],
  meta: {
    total: 10,
    offset: 0,
    limit: 10,
  },
};

export const bookingTermsQuery = (facilityId: string, params: IBookingTermCollectionQueryParams) =>
  accessibilityHttpService.get<IBookingTermCollection>(buildUrl(`facilities/${facilityId}/bookings/terms`, params));

// export const bookingTermsQuery = (facilityId: string, params: IBookingTermCollectionQueryParams) =>
//   new Promise<IBookingTermCollection>(resolve => resolve(mockedBookingTerms));

export const useBookingTermsQuery = (facilityId: string, params: IBookingTermCollectionQueryParams) => {
  return useSuspense(bookingTermsQueryKey(facilityId, params), () => bookingTermsQuery(facilityId, params));
};
