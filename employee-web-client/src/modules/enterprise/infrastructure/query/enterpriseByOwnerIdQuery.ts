import { managementHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IEnterprise } from '../../application/types';

export const enterpriseByOwnerIdQueryKey = (ownerId: string) => [`enterprises/owner/${ownerId}`, ServiceType.Management, ownerId];

export const enterpriseByOwnerIdQuery = (ownerId: string) =>
  managementHttpService.get<IEnterprise>(`enterprises/owner/${ownerId}`).catch(e => {
    if (e.status === 404) {
      return null;
    }
    throw e;
  });

export const useEnterpriseByOwnerIdQuery = (ownerId: string) => {
  return useSuspense(enterpriseByOwnerIdQueryKey(ownerId), () => enterpriseByOwnerIdQuery(ownerId)).data;
};
