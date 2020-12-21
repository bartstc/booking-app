export class RemoveFacilityCommand {
  constructor(
    public readonly facilityId: string,
    public readonly enterpriseId: string,
  ) {}
}
