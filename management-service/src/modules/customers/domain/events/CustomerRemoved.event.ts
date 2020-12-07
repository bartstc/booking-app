export class CustomerRemovedEvent {
  constructor(
    public readonly facilityId: string,
    public readonly customerId: string,
  ) {}
}
