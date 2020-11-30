import { UpdateEnterpriseDto } from './UpdateEnterprise.dto';

export class UpdateEnterpriseCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly dto: UpdateEnterpriseDto,
  ) {}
}
