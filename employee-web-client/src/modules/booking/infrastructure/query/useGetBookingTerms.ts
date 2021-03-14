import { ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IBookingTermCollection, IBookingTermCollectionQueryParams } from '../../types';

export const getBookingTermsKey = (facilityId: string, params: IBookingTermCollectionQueryParams) => [
  `facilities/${facilityId}/terms`,
  ServiceType.Accessibility,
  params,
];

const today = '2021-03-15';
const tomorrow = '2021-03-16';

const mockedBookingTerms: IBookingTermCollection = {
  collection: [
    {
      date: new Date(`${today}T08:00:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T08:30:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T09:00:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T12:00:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T12:30:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T15:30:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T16:00:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T16:30:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T17:00:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${today}T17:30:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
        },
      ],
    },
    {
      date: new Date(`${tomorrow}T08:00:00.000`).toISOString(),
      availableEmployeeIds: ['8e6f4d76-7b59-48b9-9129-508786459a34', 'a68425fa-51fd-4974-be26-9b4613621928'],
      unavailableEmployees: [
        {
          employeeId: 'f3d37ff4-ff19-4dd7-ad75-2ee9ef565019',
          earlierAvailabilityDate: new Date(`${tomorrow}T07:00:00.000`).toISOString(),
          laterAvailableDate: new Date(`${tomorrow}T10:00:00.000`).toISOString(),
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

export const getBookingTerms = (facilityId: string, params: IBookingTermCollectionQueryParams) =>
  new Promise<IBookingTermCollection>(resolve => resolve(mockedBookingTerms));

export const useGetBookingTerms = (facilityId: string, params: IBookingTermCollectionQueryParams) => {
  return useSuspense(getBookingTermsKey(facilityId, params), () => getBookingTerms(facilityId, params));
};
