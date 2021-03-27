import { managementHttpService, ServiceType } from 'utils/http';

import { IEnterprise } from '../../types';

export const enterprisesQueryKey = () => ['enterprises', ServiceType.Management];

export const enterprisesQuery = () => managementHttpService.get<IEnterprise[]>('enterprises');
