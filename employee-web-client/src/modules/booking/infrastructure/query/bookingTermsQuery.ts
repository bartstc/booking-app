import { accessibilityHttpService, ServiceType } from 'utils/http';
import { buildUrl } from 'utils';
import { useSuspense } from 'shared/Suspense';

import { IBookingTermCollection, IBookingTermCollectionQueryParams } from '../../application/types';

export const bookingTermsQueryKey = (facilityId: string, params: IBookingTermCollectionQueryParams) => [
  `facilities/${facilityId}/terms`,
  ServiceType.Accessibility,
  params,
];

export const bookingTermsQuery = (facilityId: string, params: IBookingTermCollectionQueryParams) =>
  accessibilityHttpService.get<IBookingTermCollection>(buildUrl(`facilities/${facilityId}/bookings/terms`, params));

export const useBookingTermsQuery = (facilityId: string, params: IBookingTermCollectionQueryParams) => {
  return useSuspense(bookingTermsQueryKey(facilityId, params), () => bookingTermsQuery(facilityId, params));
};
