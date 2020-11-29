import { IContactPerson } from 'shared/domain';

export class EnterpriseDto {
  enterpriseId: string;
  enterpriseName: string;
  enterpriseDescription: string;
  enterpriseUrl: string;
  countryCode: string;
  contactPerson: IContactPerson;
  createdAt: Date;
  updatedAt: Date;
}
