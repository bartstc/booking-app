import { ChangeActiveFacilityDto } from './ChangeActiveFacility.dto';

export class ChangeActiveFacilityCommand {
  constructor(
    public readonly employeeId: string,
    public readonly dto: ChangeActiveFacilityDto,
  ) {}
}
