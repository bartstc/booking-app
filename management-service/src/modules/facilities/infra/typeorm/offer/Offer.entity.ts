import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';

import { IOfferVariant, OfferStatus } from '../../../domain/types';
import { FacilityEntity } from '../facility';
import { EntityName } from '../../../adapter';

@Entity({ name: EntityName.Offer })
export class OfferEntity extends AbstractEntity {
  @PrimaryColumn()
  offer_id: string;

  @Column()
  status: OfferStatus;

  @Column('jsonb')
  details: {
    name: string;
    variants: IOfferVariant[];
  };

  @ManyToOne(
    () => FacilityEntity,
    facility => facility.offers,
  )
  @JoinColumn({ name: 'facility_id' })
  facility: FacilityEntity;

  @Column()
  facility_id: string;
}
