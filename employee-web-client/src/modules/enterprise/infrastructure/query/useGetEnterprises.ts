import { managementHttpService, ServiceType } from 'utils/http';

import { IEnterprise } from '../../types';

export const getEnterprisesKey = () => ['enterprises', ServiceType.Management];

export const getEnterprises = () => managementHttpService.get<IEnterprise[]>('enterprises');
