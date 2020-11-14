import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import {
  FacilityId,
  Offer,
  OfferName,
  OfferVariant,
  OfferVariants,
} from '../../../domain';
import { FacilityRepository, OfferRepository } from '../../../adapter';
import { AddOfferErrors } from './addOffer.errors';
import { AddOfferDto } from './addOffer.dto';
import { FacilityFactory } from '../../factories';

export type AddOfferResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddOfferErrors.FacilityNotFoundError,
  Result<Offer>
>;

@Injectable()
export class AddOfferCase
  implements UseCase<AddOfferDto, Promise<AddOfferResponse>> {
  constructor(
    private facilityRepository: FacilityRepository,
    private offerRepository: OfferRepository,
    private facilityFactory: FacilityFactory,
  ) {}

  async execute(
    dto: AddOfferDto,
    facilityId: string,
  ): Promise<AddOfferResponse> {
    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new AddOfferErrors.FacilityNotFoundError());
      }

      const name = OfferName.create({ value: dto.offerName });
      const variants = OfferVariants.create(
        dto.variants.map(variant => OfferVariant.create(variant).getValue()),
      );

      const newOfferOrError = Offer.create({
        facilityId: FacilityId.create(
          new UniqueEntityID(facilityId),
        ).getValue(),
        name: name.getValue(),
        variants,
      });

      if (!newOfferOrError.isSuccess) {
        return left(Result.fail(newOfferOrError.error));
      }

      const offer = newOfferOrError.getValue();
      const facility = await this.facilityFactory.buildFromRepository(
        facilityId,
      );
      facility.addOffer(offer);

      await this.offerRepository.persistModel(offer);
      await this.facilityRepository.persistModel(facility);

      return right(Result.ok(offer));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  private async rollbackSave(offerId: string): Promise<void> {
    await this.offerRepository.deleteOffer(offerId);
  }
}
