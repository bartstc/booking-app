export class AddCustomerCommand {
  constructor(
    public readonly facilityId: string,
    public readonly customerId: string,
  ) {}
}
