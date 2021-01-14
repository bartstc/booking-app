import { FacilityCollectionQueryParams } from '../../../adapter/params';

export class GetFacilitiesQuery {
  constructor(
    public readonly enterpriseId: string,
    public readonly params: FacilityCollectionQueryParams,
  ) {}
}
