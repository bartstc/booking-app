export class DeleteCustomerFromFacilityCommand {
  constructor(
    public readonly facilityId: string,
    public readonly customerId: string,
  ) {}
}
