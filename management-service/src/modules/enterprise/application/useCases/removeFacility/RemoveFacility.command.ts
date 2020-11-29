export class RemoveFacilityCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly facilityId: string,
  ) {}
}
