import { ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IBookingTermCollection, IBookingTermCollectionQueryParams } from '../../types';
import dayjs from 'dayjs';

export const bookingTermsQueryKey = (facilityId: string, params: IBookingTermCollectionQueryParams) => [
  `facilities/${facilityId}/terms`,
  ServiceType.Accessibility,
  params,
];

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const nextMonth = dayjs().add(32, 'day');

const mockedBookingTerms: IBookingTermCollection = {
  collection: [
    {
      date: today.hour(8).toDate().toString(),
      availableEmployeeIds: ['a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(8).minute(30).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(10).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(12).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: tomorrow.hour(7).toDate().toString(),
          laterAvailableDate: tomorrow.hour(10).toDate().toString(),
        },
      ],
    },
    {
      date: today.hour(12).minute(30).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(15).minute(30).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(16).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(16).minute(30).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(17).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(17).minute(30).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: today.hour(19).minute(30).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: tomorrow.hour(8).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
        },
      ],
    },
    {
      date: nextMonth.hour(8).toDate().toString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toString(),
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

// export const getBookingTerms = (facilityId: string, params: IBookingTermCollectionQueryParams) =>
//   accessibilityHttpService.get<IBookingTermCollection>(buildUrl(`facilities/${facilityId}/terms`, params));

export const bookingTermsQuery = (facilityId: string, params: IBookingTermCollectionQueryParams) =>
  new Promise<IBookingTermCollection>(resolve => resolve(mockedBookingTerms));

export const useBookingTermsQuery = (facilityId: string, params: IBookingTermCollectionQueryParams) => {
  return useSuspense(bookingTermsQueryKey(facilityId, params), () => bookingTermsQuery(facilityId, params));
};
