import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact } from 'shared/domain/types';

import { EntityName } from './EntityName';
import { FacilityEntity } from './Facility.entity';

@Entity({ name: EntityName.Employee })
export class EmployeeEntity extends AbstractEntity {
  @PrimaryColumn()
  employee_id: string;

  @Column('jsonb')
  details: {
    name: string;
    position: string;
    contacts: IContact[];
  };

  @ManyToOne(
    () => FacilityEntity,
    facility => facility.employees,
  )
  @JoinColumn({ name: 'facility_id' })
  facility: FacilityEntity;

  @Column()
  facility_id: string;
}
