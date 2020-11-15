import { Column, Entity, PrimaryColumn } from 'typeorm/index';

import { AbstractEntity } from 'shared/core';

import { IOfferVariant } from '../../domain/types';
import { EntityName } from './EntityName';

@Entity({ name: EntityName.Offer })
export class OfferEntity extends AbstractEntity {
  @PrimaryColumn()
  offer_id: string;

  @Column()
  facility_id: string;

  @Column('jsonb')
  details: {
    name: string;
    variants: IOfferVariant[];
  };
}
