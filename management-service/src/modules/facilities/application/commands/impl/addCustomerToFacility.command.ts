export class AddCustomerToFacilityCommand {
  constructor(
    public readonly facilityId: string,
    public readonly customerId: string,
  ) {}
}
