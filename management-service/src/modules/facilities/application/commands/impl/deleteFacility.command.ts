import { DeleteFacilityDto } from '../../useCases/deleteFacility';

export class DeleteFacilityCommand {
  constructor(public readonly dto: DeleteFacilityDto) {}
}
