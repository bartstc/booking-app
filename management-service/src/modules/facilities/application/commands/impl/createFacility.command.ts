import { CreateFacilityDto } from '../../useCases/createFacility';

export class CreateFacilityCommand {
  constructor(
    public readonly dto: CreateFacilityDto,
    public readonly enterpriseId: string,
  ) {}
}
