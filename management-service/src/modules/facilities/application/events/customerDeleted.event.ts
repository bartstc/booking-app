export class CustomerDeletedEvent {
  constructor(
    public readonly facilityId: string,
    public readonly customerId: string,
  ) {}
}
