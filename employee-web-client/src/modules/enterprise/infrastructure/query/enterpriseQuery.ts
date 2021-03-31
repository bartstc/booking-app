import { managementHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IEnterprise } from '../../types';

export const enterpriseQueryKey = (enterpriseId: string) => [`enterprises/${enterpriseId}`, ServiceType.Management, enterpriseId];

export const enterpriseQuery = (enterpriseId: string) => managementHttpService.get<IEnterprise>(`enterprises/${enterpriseId}`);

export const useEnterpriseQuery = (enterpriseId: string) => {
  return useSuspense(enterpriseQueryKey(enterpriseId), () => enterpriseQuery(enterpriseId)).data;
};
