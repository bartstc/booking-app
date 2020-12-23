import { UniqueEntityID } from 'shared/domain';
import { Result } from 'shared/core';

import {
  FacilityId,
  Offer,
  OfferName,
  OfferVariant,
  OfferVariants,
} from '../domain';
import { BuildOfferDto } from './BuildOffer.dto';

export class OfferMap {
  public static dtoToDomain(
    dto: BuildOfferDto,
    facilityId: string,
    offerId?: string,
  ): Result<Offer> {
    const name = OfferName.create({ value: dto.offerName });
    const variantList: OfferVariant[] = [];

    dto.variants.forEach(variant => {
      variantList.push(OfferVariant.create(variant).getValue());
    });

    const variants = OfferVariants.create(variantList);

    return Offer.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(facilityId),
        ).getValue(),
        isActive: true,
        name: name.getValue(),
        variants,
      },
      new UniqueEntityID(offerId),
    );
  }

  public static entityToDomain(entity: any): Offer {
    const name = OfferName.create({ value: entity.details.name });
    const variantList: OfferVariant[] = [];

    entity.details.variants.forEach(variant => {
      variantList.push(OfferVariant.create(variant).getValue());
    });

    const variants = OfferVariants.create(variantList);

    const offerOrError = Offer.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(entity.facility_id),
        ).getValue(),
        isActive: entity.is_active,
        name: name.getValue(),
        variants,
      },
      new UniqueEntityID(entity.offer_id),
    );

    if (!offerOrError.isSuccess) {
      console.log(offerOrError.error);
    }

    return offerOrError.getValue();
  }

  public static entityToDomainBulk(entities: any[]): Offer[] {
    return entities.map(entity => this.entityToDomain(entity));
  }

  public static toPersistence(offer: Offer): Partial<any> {
    return {
      offer_id: offer.offerId.id.toString(),
      facility_id: offer.facilityId,
      is_active: offer.isActive,
      details: {
        name: offer.name.value,
        variants: offer.variants.getItems().map(offer => offer.props),
      },
    };
  }
}
