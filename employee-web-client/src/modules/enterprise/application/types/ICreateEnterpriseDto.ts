import { IUpdateEnterpriseDto } from './IUpdateEnterpriseDto';

export interface ICreateEnterpriseDto extends IUpdateEnterpriseDto {
  ownerId: string; // required when creating new one
}
