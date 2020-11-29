export class FacilityAddedEvent {
  constructor(
    public readonly enterpriseId: string,
    public readonly facilityId: string,
  ) {}
}
