import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact, IContactPerson } from 'shared/domain/types';

import { IAddress, IBusinessCategory, IWorkingDay } from '../../domain/types';
import { EntityName } from './EntityName';
import { EnterpriseEntity } from '../../../enterprise/infra/entities';

@Entity({ name: EntityName.Facility })
export class FacilityEntity extends AbstractEntity {
  @PrimaryColumn()
  facility_id: string;

  @Column('jsonb')
  details: {
    name: string;
    description: string;
    contactPerson: IContactPerson;
    address: IAddress;
    businessCategories: IBusinessCategory[];
    contacts: IContact[];
    workingDays: IWorkingDay[];
  };

  @Column('text', { array: true })
  employeeIds: string[];

  @Column('text', { array: true })
  offerIds: string[];

  @ManyToOne(
    () => EnterpriseEntity,
    enterprise => enterprise.facilities,
  )
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: EnterpriseEntity;

  @Column()
  enterprise_id: string;
}
