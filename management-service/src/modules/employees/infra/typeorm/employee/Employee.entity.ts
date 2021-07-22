import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact } from 'shared/domain/types';

import { EntityName } from '../../../adapter';
import { EmployeeStatus } from '../../../domain/types';
import { EnterpriseEntity } from '../../../../enterprise/infra';
import { EmployeeScopeEntity } from '../employeeScope';

@Entity({ name: EntityName.Employee, schema: 'management' })
export class EmployeeEntity extends AbstractEntity {
  @PrimaryColumn()
  employee_id: string;

  @Column()
  status: EmployeeStatus;

  @Column('jsonb')
  details: {
    email: string;
    name: string;
    position: string;
    birthDate: Date;
    employmentDate: Date;
    contacts: IContact[];
  };

  @OneToOne(
    () => EmployeeScopeEntity,
    (employeeScope) => employeeScope.employee,
  )
  @JoinColumn({ name: 'employee_scope_id' })
  employeeScope: EmployeeScopeEntity;

  @Column()
  employee_scope_id: string;

  @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.employees)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: EnterpriseEntity;

  @Column()
  enterprise_id: string;
}
