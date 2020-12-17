import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact, IContactPerson } from 'shared/domain/types';

import {
  IAddress,
  IBusinessCategory,
  IWorkingDay,
} from '../../../domain/types';
import { EmployeeEntity } from '../employee';
import { OfferEntity } from '../offer';
import { EnterpriseEntity } from '../../../../enterprise/infra';
import { CustomerEntity } from '../../../../customers/infra/typeorm';
import { EntityName } from '../../../adapter';

@Entity({ name: EntityName.Facility })
export class FacilityEntity extends AbstractEntity {
  @PrimaryColumn()
  facility_id: string;

  @Column({ unique: true })
  slug: string;

  @Column('jsonb')
  details: {
    name: string;
    description: string;
    contactPerson: IContactPerson;
    address: IAddress;
    businessCategories: IBusinessCategory[];
    contacts: IContact[];
    workingDays: IWorkingDay[];
  };

  @OneToMany(
    () => EmployeeEntity,
    employee => employee.facility,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true },
  )
  employees: EmployeeEntity[];

  @OneToMany(
    () => OfferEntity,
    offer => offer.facility,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true },
  )
  offers: OfferEntity[];

  @OneToMany(
    () => CustomerEntity,
    customer => customer.facility,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  customers: CustomerEntity[];

  @ManyToOne(
    () => EnterpriseEntity,
    enterprise => enterprise.facilities,
  )
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: EnterpriseEntity;

  @Column()
  enterprise_id: string;
}
