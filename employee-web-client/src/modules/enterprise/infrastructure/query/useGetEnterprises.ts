import { managementHttpService } from 'utils/http';

import { IEnterprise } from '../../types';

export const getEnterprisesKey = () => ['enterprises'];

export const getEnterprises = () => managementHttpService.get<IEnterprise[]>('enterprises');
