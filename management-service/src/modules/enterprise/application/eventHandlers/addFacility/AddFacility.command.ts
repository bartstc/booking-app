export class AddFacilityCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly facilityId: string,
  ) {}
}
