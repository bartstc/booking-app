import { BuildEnterpriseDto } from '../../../adapter';

export class CreateEnterpriseDto extends BuildEnterpriseDto {
  ownerId: string;
}
