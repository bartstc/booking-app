import { CreateEnterpriseDto } from '../../useCases/createEnterprise';

export class CreateEnterpriseCommand {
  constructor(public readonly createEnterpriseDto: CreateEnterpriseDto) {}
}
