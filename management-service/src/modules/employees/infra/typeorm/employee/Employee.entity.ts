import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact } from 'shared/domain/types';
import { ContextType } from 'shared/domain';

import { EntityName } from '../../../adapter';
import { EmployeeStatus } from '../../../domain';
import { EnterpriseEntity } from '../../../../enterprise/infra';

@Entity({ name: EntityName.Employee, schema: 'management' })
export class EmployeeEntity extends AbstractEntity {
  @PrimaryColumn()
  employee_id: string;

  @Column()
  status: EmployeeStatus;

  @Column('jsonb')
  scope: {
    employeeId: string;
    contextType: ContextType;
    enterpriseId: string;
    facilityIds: string[];
    activeFacilityId: string | null;
  };

  @Column('jsonb')
  details: {
    email: string;
    name: string;
    position: string;
    birthDate: Date;
    employmentDate: Date;
    contacts: IContact[];
  };

  @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.employees)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: EnterpriseEntity;

  @Column()
  enterprise_id: string;
}
