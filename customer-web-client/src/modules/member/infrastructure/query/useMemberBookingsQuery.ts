import { communityHttpService, ServiceType } from "utils/http";
import { useSuspense } from "shared/Suspense";

import { IMembersBooking } from "../../application/types";

export const membersBookingsQueryKey = (memberId: string) => [
  `Members/${memberId}/Bookings`,
  ServiceType.Community,
];

export const useMembersBookingsQuery = (memberId: string) => {
  return useSuspense(membersBookingsQueryKey(memberId), () =>
    communityHttpService.get<{ bookings: IMembersBooking[] }>(
      `Members/${memberId}/Bookings`
    )
  ).data;
};
