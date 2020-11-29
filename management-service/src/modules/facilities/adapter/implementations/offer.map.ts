import { UniqueEntityID } from 'shared/domain';
import { Mapper } from 'shared/core';

import {
  FacilityId,
  Offer,
  OfferName,
  OfferVariant,
  OfferVariants,
} from '../../domain';
import { OfferEntity } from '../../infra/entities';
import { OfferDto } from '../../application/dtos';

export class OfferMap implements Mapper<Offer> {
  public static toDomain(entity: OfferEntity): Offer {
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

  public static rawToDtoBulk(offers: OfferEntity[]): OfferDto[] {
    return offers.map(offer => this.rawToDto(offer));
  }

  public static rawToDto(offer: OfferEntity): OfferDto {
    return {
      offerId: offer.offer_id,
      facilityId: offer.facility_id,
      name: offer.details.name,
      variants: offer.details.variants,
    };
  }

  public static toDomainBulk(entities: OfferEntity[]): Offer[] {
    return entities.map(entity => this.toDomain(entity));
  }

  public static modelToPersistence(offer: Offer): Partial<OfferEntity> {
    return {
      offer_id: offer.offerId.id.toString(),
      facility_id: offer.facilityId,
      details: {
        name: offer.name.value,
        variants: offer.variants.getItems().map(offer => offer.props),
      },
    };
  }
}
