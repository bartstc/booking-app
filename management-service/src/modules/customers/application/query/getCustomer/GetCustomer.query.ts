export class GetCustomerQuery {
  constructor(
    public readonly customerId: string,
    public readonly facilityId: string,
  ) {}
}
