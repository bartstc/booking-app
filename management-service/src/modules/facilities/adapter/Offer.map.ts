import { UniqueEntityID } from 'shared/domain';
import { Result } from 'shared/core';

import { FacilityId, Offer, OfferName, Price } from '../domain';
import { BuildOfferDto } from './BuildOffer.dto';
import { OfferStatus } from '../domain/types';

export class OfferMap {
  public static dtoToDomain(
    dto: BuildOfferDto,
    facilityId: string,
    offerId?: string,
  ): Result<Offer> {
    const name = OfferName.create({ value: dto.offerName });
    const price = Price.create(dto.price);

    return Offer.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(facilityId),
        ).getValue(),
        status: OfferStatus.Active,
        name: name.getValue(),
        duration: dto.duration,
        price: price.getValue(),
      },
      new UniqueEntityID(offerId),
    );
  }

  public static entityToDomain(entity: any): Offer {
    const name = OfferName.create({ value: entity.details.name });
    const price = Price.create(entity.details.price);

    const offerOrError = Offer.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(entity.facility_id),
        ).getValue(),
        status: entity.status,
        name: name.getValue(),
        duration: entity.details.duration,
        price: price.getValue(),
      },
      new UniqueEntityID(entity.offer_id),
    );

    if (!offerOrError.isSuccess) {
      console.log(offerOrError.error);
    }

    return offerOrError.getValue();
  }

  public static entityToDomainBulk(entities: any[]): Offer[] {
    return entities.map((entity) => this.entityToDomain(entity));
  }

  public static toPersistence(offer: Offer): Partial<any> {
    return {
      offer_id: offer.offerId.id.toString(),
      facility_id: offer.facilityId,
      status: offer.status,
      details: {
        name: offer.name.value,
        duration: offer.duration,
        price: offer.price.props,
      },
    };
  }
}
