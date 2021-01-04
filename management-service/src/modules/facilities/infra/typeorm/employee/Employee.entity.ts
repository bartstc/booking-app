import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact } from 'shared/domain/types';

import { FacilityEntity } from '../facility';
import { EntityName } from '../../../adapter';
import { EmployeeStatus } from '../../../domain/types';

@Entity({ name: EntityName.Employee, schema: 'management' })
export class EmployeeEntity extends AbstractEntity {
  @PrimaryColumn()
  employee_id: string;

  @Column()
  status: EmployeeStatus;

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
