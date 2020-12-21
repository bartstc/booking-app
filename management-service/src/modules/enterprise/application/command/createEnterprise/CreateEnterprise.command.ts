import { CreateEnterpriseDto } from './CreateEnterprise.dto';

export class CreateEnterpriseCommand {
  constructor(public readonly createEnterpriseDto: CreateEnterpriseDto) {}
}
