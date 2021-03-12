import { managementHttpService } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IEnterprise } from '../../types';

export const getEnterpriseKey = (enterpriseId: string) => [`enterprises/${enterpriseId}`, enterpriseId];

export const getEnterprise = (enterpriseId: string) => managementHttpService.get<IEnterprise>(`enterprises/${enterpriseId}`);

export const useGetEnterprise = (enterpriseId: string) => {
  return useSuspense(getEnterpriseKey(enterpriseId), () => getEnterprise(enterpriseId));
};
