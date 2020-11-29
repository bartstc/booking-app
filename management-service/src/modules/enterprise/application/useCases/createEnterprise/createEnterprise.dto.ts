import { IContactPerson } from 'shared/domain';

export interface CreateEnterpriseDto {
  enterpriseName: string;
  enterpriseDescription: string;
  enterpriseUrl: string;
  countryCode: string;
  contactPerson: IContactPerson;
}
