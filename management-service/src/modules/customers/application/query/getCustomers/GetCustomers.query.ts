import { CustomerCollectionQueryParams } from '../../../adapter/params';

export class GetCustomersQuery {
  constructor(
    public readonly facilityId: string,
    public readonly params: CustomerCollectionQueryParams,
  ) {}
}
