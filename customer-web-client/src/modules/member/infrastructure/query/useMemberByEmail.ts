import { useSuspense } from "shared/Suspense";
import { communityHttpService, ServiceType } from "utils/http";

import { IMember } from "../../application/types";

export const memberByEmailQueryKey = (memberEmail: string) => [
  `Members/${memberEmail}`,
  ServiceType.Community,
];

export const memberByEmailQuery = (memberEmail: string) => {
  return communityHttpService
    .get<IMember>(`Members/${memberEmail}`)
    .catch((e) => {
      if (e.status === 404) {
        return null;
      }
      throw e;
    });
};

export const useMemberByEmailQuery = (memberEmail: string) => {
  return useSuspense(memberByEmailQueryKey(memberEmail), () =>
    memberByEmailQuery(memberEmail)
  ).data;
};
