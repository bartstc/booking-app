import { Column, Entity, PrimaryColumn } from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact } from 'shared/domain/types';

import { EmployeePosition } from '../../domain/types';
import { EntityName } from './EntityName';

@Entity({ name: EntityName.Employee })
export class EmployeeEntity extends AbstractEntity {
  @PrimaryColumn()
  employee_id: string;

  @Column()
  facility_id: string;

  @Column('jsonb')
  details: {
    name: string;
    position: EmployeePosition;
    employmentDate: string;
    contacts: IContact[];
  };
}
