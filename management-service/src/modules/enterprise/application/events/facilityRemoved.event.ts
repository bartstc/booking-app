export class FacilityRemovedEvent {
  constructor(
    public readonly enterpriseId: string,
    public readonly facilityId: string,
  ) {}
}
