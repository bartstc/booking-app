import { httpService } from 'utils/http';

import { IEnterprise } from '../../types';

export const getEnterprisesKey = () => ['enterprises'];

export const getEnterprises = () => httpService.get<IEnterprise[]>('enterprises');
