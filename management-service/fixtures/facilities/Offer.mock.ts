import { BuildOfferDto, OfferMap } from '../../src/modules/facilities/adapter';
import {
  Currency,
  PriceModel,
} from '../../src/modules/facilities/domain/types';
import { UniqueEntityID } from '../../src/shared/domain';
import { Offer } from '../../src/modules/facilities/domain';

interface Props {
  offerId?: UniqueEntityID;
  facilityId?: UniqueEntityID;
  dto?: Partial<BuildOfferDto>;
}

const defaultDto: BuildOfferDto = {
  offerName: 'Male haircut',
  variants: [
    {
      duration: 40,
      price: {
        type: PriceModel.Constant,
        value: '45.00',
        currency: Currency.Pln,
      },
    },
  ],
};

export const createOffer = ({
  dto = {},
  facilityId = new UniqueEntityID(),
  offerId = new UniqueEntityID(),
}: Props): Offer => {
  return OfferMap.dtoToDomain(
    { ...defaultDto, ...dto },
    facilityId.toString(),
    offerId.toString(),
  ).getValue();
};
