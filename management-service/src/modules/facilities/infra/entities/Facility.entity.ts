import { Column, Entity, PrimaryColumn } from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact, IContactPerson } from 'shared/domain/types';

import { IAddress, IBusinessCategory, IWorkingDay } from '../../domain/types';

@Entity('facilities')
export class FacilityEntity extends AbstractEntity {
  @PrimaryColumn()
  facility_id: string;

  @Column()
  enterprise_id: string;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: false,
  })
  details: {
    name: string;
    description: string;
    contactPerson: IContactPerson;
    address: IAddress;
    businessCategories: IBusinessCategory[];
    contacts: IContact[];
  };

  @Column('text', { array: true, default: [] })
  employeeIds: string[];

  @Column('text', { array: true, default: [] })
  offerIds: string[];

  @Column('text', { array: true, default: [] })
  workingDays: IWorkingDay[];
}
