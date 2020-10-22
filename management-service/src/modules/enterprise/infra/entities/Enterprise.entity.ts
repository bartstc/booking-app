import { Column, Entity, PrimaryColumn } from 'typeorm/index';

import { AbstractEntity } from 'shared/core';

import { IContactPerson } from '../../domain/types';

@Entity('enterprises')
export class EnterpriseEntity extends AbstractEntity {
  @PrimaryColumn()
  enterprise_id: string;

  // @Column()
  // active: boolean;

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
}
