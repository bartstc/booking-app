import { httpService } from 'utils/http-service';
import { buildUrl } from 'utils';

import { IFacilityCollection, IFacilityCollectionQueryParams } from '../../types';

export const getFacilitiesKey = (enterpriseId: string, params?: IFacilityCollectionQueryParams) => [
  `enterprises/${enterpriseId}/facilities`,
  params,
];

export const getFacilities = (enterpriseId: string, params?: IFacilityCollectionQueryParams) =>
  httpService.get<IFacilityCollection>(buildUrl(`enterprises/${enterpriseId}/facilities`, params));
