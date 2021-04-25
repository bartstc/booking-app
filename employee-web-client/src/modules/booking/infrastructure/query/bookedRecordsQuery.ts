import dayjs from 'dayjs';

import { Currency } from 'types';
import { ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IBookedRecordCollection, IBookedRecordCollectionQueryParams } from '../../application/types';

const bookedRecordId = 'f8c40e23-7d02-4895-9bda-cc497911a74x';
const bookingId = 'f8c40e23-7d02-4895-9bda-cc497911a75x';
const customerId = 'f8c40e23-7d02-4895-9bda-cc497911a76x';

const firstEmployeeId = 'f8c40e23-7d02-4895-9bda-cc497911a74b';
// const secondEmployeeId = '6da99b33-ffa6-4938-97df-764b10c38003';
// const thirdEmployeeId = '8e4569eb-e8b9-4072-ab14-e16b4fc1fe6a';

const offerId = '123';

const today = dayjs().add(1, 'day');
// const tomorrow = dayjs().add(1, 'day');
// const nextMonth = dayjs().add(32, 'day');

const mockedBookedRecords: IBookedRecordCollection = [
  {
    bookedRecordId,
    bookingId,
    currency: Currency.Pln,
    customerId,
    dateFrom: today.hour(8).toDate().toString(),
    dateTo: today.hour(8).minute(30).toDate().toString(),
    duration: 30,
    employeeId: firstEmployeeId,
    employeeName: 'John Doe',
    offerId,
    offerName: 'Testowa oferta',
    price: 40,
    status: 0,
  },
  {
    bookedRecordId,
    bookingId,
    currency: Currency.Pln,
    customerId,
    dateFrom: today.hour(8).minute(30).toDate().toString(),
    dateTo: today.hour(9).minute(0).toDate().toString(),
    duration: 30,
    employeeId: firstEmployeeId,
    employeeName: 'John Doe',
    offerId,
    offerName: 'Testowa oferta',
    price: 40,
    status: 0,
  },
  {
    bookedRecordId,
    bookingId,
    currency: Currency.Pln,
    customerId,
    dateFrom: today.hour(14).minute(30).toDate().toString(),
    dateTo: today.hour(16).minute(0).toDate().toString(),
    duration: 30,
    employeeId: firstEmployeeId,
    employeeName: 'John Doe',
    offerId,
    offerName: 'Testowa oferta',
    price: 40,
    status: 0,
  },
];

export const bookedRecordsQueryKey = (facilityId: string, params: IBookedRecordCollectionQueryParams) => [
  `facilities/${facilityId}/bookings/records`,
  ServiceType.Accessibility,
  params,
];

export const useBookedRecordsQuery = (facilityId: string, params: IBookedRecordCollectionQueryParams) => {
  return useSuspense(bookedRecordsQueryKey(facilityId, params), () => Promise.resolve<IBookedRecordCollection>(mockedBookedRecords)).data;
};