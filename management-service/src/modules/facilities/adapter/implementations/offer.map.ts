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

  public static toDomainBulk(entities: OfferEntity[]): Offer[] {
    return entities.map(entity => this.toDomain(entity));
  }
}
