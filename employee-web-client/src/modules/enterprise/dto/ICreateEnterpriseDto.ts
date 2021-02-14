import { IContactPerson } from '../../../types';

export interface ICreateEnterpriseDto {
  enterpriseName: string;
  enterpriseDescription: string;
  enterpriseUrl: string;
  countryCode: string;
  contactPerson: IContactPerson;
}
