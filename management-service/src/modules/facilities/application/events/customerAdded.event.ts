export class CustomerAddedEvent {
  constructor(
    public readonly facilityId: string,
    public readonly customerId: string,
  ) {}
}
