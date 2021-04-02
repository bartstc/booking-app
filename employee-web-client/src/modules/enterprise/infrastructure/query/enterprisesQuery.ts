import { managementHttpService, ServiceType } from 'utils/http';

import { IEnterprise } from '../../application/types';

export const enterprisesQueryKey = () => ['enterprises', ServiceType.Management];

export const enterprisesQuery = () => managementHttpService.get<IEnterprise[]>('enterprises');
