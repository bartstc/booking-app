import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { IContact } from 'shared/domain/types';
import { AbstractEntity } from 'shared/core';

import { IAddress } from '../../domain/types';
import { FacilityEntity } from '../../../facilities/infra/typeorm/facility';
import { EntityName } from '../../adapter';

@Entity({ name: EntityName.Customer })
export class CustomerEntity extends AbstractEntity {
  @PrimaryColumn()
  customer_id: string;

  @Column('jsonb')
  details: {
    fullName: string;
    birthDate: string;
    description: string;
    contacts: IContact[];
    address: IAddress;
  };

  @ManyToOne(
    () => FacilityEntity,
    facility => facility.customers,
  )
  @JoinColumn({ name: 'facility_id' })
  facility: FacilityEntity;

  @Column()
  facility_id: string;
}
