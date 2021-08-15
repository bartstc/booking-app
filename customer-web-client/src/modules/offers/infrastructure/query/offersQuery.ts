import { buildUrl } from "utils";
import { managementHttpService, ServiceType } from "utils/http";

import {
  IOfferCollection,
  IOfferCollectionQueryParams,
} from "../../application";

export const offersQueryKey = (
  params?: IOfferCollectionQueryParams
): [string, ServiceType, IOfferCollectionQueryParams | undefined] => [
  `offers`,
  ServiceType.Management,
  params,
];

export const offersQuery = (params: IOfferCollectionQueryParams) =>
  managementHttpService.get<IOfferCollection>(buildUrl(`offers`, params));
