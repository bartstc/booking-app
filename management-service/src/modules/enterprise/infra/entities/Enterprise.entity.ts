import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  RelationId,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContactPerson } from 'shared/domain';
import { FacilityEntity } from '../../../facilities/infra/entities';

@Entity('enterprises')
export class EnterpriseEntity extends AbstractEntity {
  @PrimaryColumn()
  enterprise_id: string;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: false,
  })
  details: {
    name: string;
    description: string;
    url: string;
    countryCode: string;
    contactPerson: IContactPerson;
  };

  @OneToMany(
    () => FacilityEntity,
    facility => facility.enterprise,
  )
  @JoinColumn({ name: 'facility_ids' })
  facilities: FacilityEntity[];

  @Column('text', { array: true, default: "{}" })
  facility_ids: string[];
}
