import { IContactPerson } from 'types';

export interface IUpdateEnterpriseDto {
  enterpriseName: string;
  enterpriseDescription: string;
  enterpriseUrl: string;
  contactPerson: IContactPerson;
}
