import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm/index';

import { ContextType } from 'shared/domain';
import { AbstractEntity } from 'shared/core';

import { EntityName } from '../../../adapter';
import { EmployeeEntity } from '../employee';

@Entity({ name: EntityName.Employee_scope, schema: 'management' })
export class EmployeeScopeEntity extends AbstractEntity {
  @PrimaryColumn()
  employee_scope_id: string;

  @Column()
  enterprise_id: string;

  @Column()
  context_type: ContextType;

  @Column({ array: true })
  facility_ids: Array<string>;

  @Column({ nullable: true })
  active_facility_id: string | null;

  @OneToOne(() => EmployeeEntity, (employee) => employee.employeeScope)
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;

  @Column()
  employee_id: string;
}
