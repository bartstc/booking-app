import { IContactPerson } from 'shared/domain';

export interface BuildEnterpriseDto {
  enterpriseName: string;
  enterpriseDescription: string;
  enterpriseUrl: string;
  countryCode: string;
  contactPerson: IContactPerson;
}
