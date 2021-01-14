import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';

import { IPrice, OfferStatus } from '../../../domain/types';
import { FacilityEntity } from '../facility';
import { EntityName } from '../../../adapter';

@Entity({ name: EntityName.Offer, schema: 'management' })
export class OfferEntity extends AbstractEntity {
  @PrimaryColumn()
  offer_id: string;

  @Column()
  status: OfferStatus;

  @Column('jsonb')
  details: {
    name: string;
    duration: number;
    price: IPrice;
  };

  @ManyToOne(() => FacilityEntity, (facility) => facility.offers)
  @JoinColumn({ name: 'facility_id' })
  facility: FacilityEntity;

  @Column()
  facility_id: string;
}
