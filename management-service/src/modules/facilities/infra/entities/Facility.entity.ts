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

import { EnterpriseEntity } from '../../../enterprise/infra';
import { IAddress, IBusinessCategory, IWorkingDay } from '../../domain/types';
import { EntityName } from './EntityName';
import { EmployeeEntity } from './Employee.entity';
import { OfferEntity } from './Offer.entity';

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
  )
  @JoinColumn({ name: 'employee_ids' })
  employees: EmployeeEntity[];

  @Column('text', { array: true, default: '{}' })
  employee_ids: string[];

  @OneToMany(
    () => OfferEntity,
    offer => offer.facility,
  )
  @JoinColumn({ name: 'offer_ids' })
  offers: OfferEntity[];

  @Column('text', { array: true, default: '{}' })
  offer_ids: string[];

  @ManyToOne(
    () => EnterpriseEntity,
    enterprise => enterprise.facilities,
  )
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: EnterpriseEntity;

  @Column()
  enterprise_id: string;
}
