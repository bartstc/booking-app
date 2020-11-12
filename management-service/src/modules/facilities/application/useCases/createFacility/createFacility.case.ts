import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';
import {
  Contact,
  ContactPerson,
  Contacts,
  UniqueEntityID,
} from 'shared/domain';

import { CreateFacilityDto } from './createFacility.dto';
import {
  Address,
  Availability,
  BusinessCategories,
  BusinessCategory,
  Employees,
  Facility,
  FacilityDescription,
  FacilityName,
  Offers,
  WorkingDay,
} from '../../../domain';
import { FacilityRepository } from '../../../adapter';
import { EnterpriseId } from '../../../../enterprise/domain';

export type CreateFacilityResponse = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<Facility>
>;

@Injectable()
export class CreateFacilityCase
  implements UseCase<CreateFacilityDto, Promise<CreateFacilityResponse>> {
  constructor(
    @InjectRepository(FacilityRepository)
    private repository: FacilityRepository,
  ) {}

  async execute(
    dto: CreateFacilityDto,
    enterpriseId: string,
  ): Promise<CreateFacilityResponse> {
    try {
      const name = FacilityName.create({ value: dto.facilityName });
      const address = Address.create(dto.address);
      const businessCategories = BusinessCategories.create(
        dto.businessCategories.map(category =>
          BusinessCategory.create(category).getValue(),
        ),
      );
      const contacts = Contacts.create(
        dto.contacts
          ? dto.contacts.map(contact => Contact.create(contact).getValue())
          : undefined,
      );
      const availability = Availability.create(
        dto.availability.map(workingDay =>
          WorkingDay.create(workingDay).getValue(),
        ),
      );

      const facilityOrError = Facility.create({
        enterpriseId: EnterpriseId.create(
          new UniqueEntityID(enterpriseId),
        ).getValue(),
        name: name.getValue(),
        description: dto.facilityDescription
          ? FacilityDescription.create({
              value: dto.facilityDescription,
            }).getValue()
          : null,
        contactPerson: dto.contactPerson
          ? ContactPerson.create(dto.contactPerson).getValue()
          : null,
        address: address.getValue(),
        businessCategories,
        contacts,
        availability: availability.getValue(),
        employees: Employees.create(),
        offers: Offers.create(),
      });

      if (!facilityOrError.isSuccess) {
        return left(Result.fail(facilityOrError.error));
      }

      const facility = facilityOrError.getValue();
      await this.repository.persistModel(facility);
      return right(Result.ok(facility));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
