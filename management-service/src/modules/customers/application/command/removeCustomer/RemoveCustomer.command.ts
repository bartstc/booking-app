export class RemoveCustomerCommand {
  constructor(
    public readonly facilityId: string,
    public readonly customerId: string,
  ) {}
}
