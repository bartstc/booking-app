import { OfferEntity } from './Offer.entity';
import { OfferDto } from '../../../application/dto';

export class OfferTypeormTransformer {
  public static toDtoBulk(offers: OfferEntity[]): OfferDto[] {
    return offers.map((offer) => this.toDto(offer));
  }

  public static toDto(offer: OfferEntity): OfferDto {
    return {
      offerId: offer.offer_id,
      facilityId: offer.facility_id,
      status: offer.status,
      name: offer.details.name,
      duration: offer.details.duration,
      price: offer.details.price,
    };
  }
}
