import { httpService } from 'utils/http';

import { IEnterprise } from '../../types';

export const getEnterprisesKey = () => ['enterprises'];

export const getEnterprises = () => httpService.get<IEnterprise[]>('enterprises');

export const getEnterpriseKey = (enterpriseId: string) => [`enterprises/${enterpriseId}`, enterpriseId];

export const getEnterprise = (enterpriseId: string) => httpService.get<IEnterprise>(`enterprises/${enterpriseId}`);
