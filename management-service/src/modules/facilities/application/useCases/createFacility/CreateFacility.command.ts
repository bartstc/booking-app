import { CreateFacilityDto } from './CreateFacility.dto';

export class CreateFacilityCommand {
  constructor(
    public readonly dto: CreateFacilityDto,
    public readonly enterpriseId: string,
  ) {}
}
