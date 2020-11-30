import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';

import { EntityName } from '../../EntityName';
import { IOfferVariant } from '../../../domain/types';
import { FacilityEntity } from '../facility';

@Entity({ name: EntityName.Offer })
export class OfferEntity extends AbstractEntity {
  @PrimaryColumn()
  offer_id: string;

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
