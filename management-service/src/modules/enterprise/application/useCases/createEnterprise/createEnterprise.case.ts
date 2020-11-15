import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';
import { Link, ContactPerson, CountryCode } from 'shared/domain';

import {
  Enterprise,
  EnterpriseDescription,
  EnterpriseName,
} from '../../../domain';
import { EnterpriseMap, EnterpriseRepository } from '../../../adapter';
import { CreateEnterpriseDto } from './createEnterprise.dto';

export type CreateEnterpriseResponse = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<Enterprise>
>;

@Injectable()
export class CreateEnterpriseCase
  implements UseCase<CreateEnterpriseDto, Promise<CreateEnterpriseResponse>> {
  constructor(private repository: EnterpriseRepository) {}

  async execute(dto: CreateEnterpriseDto): Promise<CreateEnterpriseResponse> {
    try {
      const name = EnterpriseName.create({ value: dto.enterpriseName });
      const description = EnterpriseDescription.create({
        value: dto.enterpriseDescription,
      });
      const url = Link.create({ value: dto.enterpriseUrl });
      const countryCode = CountryCode.create({ value: dto.countryCode });
      const contactPerson = ContactPerson.create(dto.contactPerson);

      const enterpriseOrError = Enterprise.create({
        enterpriseName: name.getValue(),
        enterpriseDescription: description.getValue(),
        enterpriseUrl: url.getValue(),
        countryCode: countryCode.getValue(),
        contactPerson: contactPerson.getValue(),
        facilityIds: [],
      });

      if (!enterpriseOrError.isSuccess) {
        return left(Result.fail(enterpriseOrError.error));
      }

      const enterprise = enterpriseOrError.getValue();
      await this.repository
        .create(EnterpriseMap.modelToPersistence(enterprise))
        .save();

      return right(Result.ok(enterprise));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
