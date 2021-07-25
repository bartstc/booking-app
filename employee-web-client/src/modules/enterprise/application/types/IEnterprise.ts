import { IContactPerson } from 'types';

export interface IEnterprise {
  enterpriseId: string;
  enterpriseName: string;
  enterpriseDescription: string;
  enterpriseUrl: string;
  contactPerson: IContactPerson;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
