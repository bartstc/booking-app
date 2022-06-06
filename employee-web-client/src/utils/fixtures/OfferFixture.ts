import { createFixture } from './fixture';
import { IOffer, OfferStatus, PriceModel } from '../../modules/offers/application/types';
import { Currency } from '../../types';

export const OfferFixture = createFixture<IOffer>({
  offerId: '1',
  duration: 60,
  name: 'Male haircut',
  facilityId: '',
  status: OfferStatus.Active,
  price: {
    type: PriceModel.Constant,
    value: '90.00',
    currency: Currency.Eu,
  },
});
