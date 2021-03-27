import { UpdateFacilityDto } from './UpdateFacility.dto';

export class UpdateFacilityCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly facilityId: string,
    public readonly dto: UpdateFacilityDto,
  ) {}
}
