import { IQueryParams } from "types";

import { PriceModel } from "./PriceModel";

export interface IOfferCollectionQueryParams extends IQueryParams {
  name?: string;
  priceType?: PriceModel;
}
