import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FacilityFixture, OfferFixture, renderWithProviders, mockResponseFactory, MetaFixture } from 'utils';
import { managementMockService } from 'utils/mock';

import { IOfferCollection, OfferStatus, PriceModel } from '../../modules/offers/application/types';
import { offersQueryKey } from '../../modules/offers/infrastructure/query';
import { FacilityProvider } from '../../modules/context/application';
import Offers from './index';
import { Currency } from '../../types';

const FACILITY_ID = '1';
const OFFER_ID_1 = '123';
const OFFER_ID_2 = '456';

const facility = FacilityFixture.createPermutation({ facilityId: FACILITY_ID });
const existingOffer = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_1,
  name: 'First offer',
  status: OfferStatus.Active,
});
const newOffer = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_2,
  name: 'Brand new offer',
  status: OfferStatus.Active,
  duration: 60,
  price: {
    value: '100.00',
    type: PriceModel.Constant,
    currency: Currency.Eu,
  },
});

const mockOffers = mockResponseFactory<IOfferCollection>(
  {
    meta: MetaFixture.createPermutation({ total: 2 }),
    collection: [existingOffer],
  },
  resp => managementMockService.get(offersQueryKey(FACILITY_ID)[0], resp),
);

it('should add new offer to the list', async function () {
  mockOffers();
  managementMockService.post(`facilities/${FACILITY_ID}/offers`, {
    offerName: newOffer.name,
    duration: newOffer.duration.toString(),
    price: newOffer.price,
  });

  renderView();

  const openCreateOfferDialogButton = await screen.getByText('Add offer');
  userEvent.click(openCreateOfferDialogButton);

  expect(screen.getByText('Add new offer')).toBeInTheDocument();

  // huge mistake - should be get by label text - bug within fields library
  const offerNameInput = screen.getByTestId('offer-name').querySelector('#offer-name');
  const durationInput = screen.getByTestId('duration').querySelector('#duration');
  const priceValueInput = screen.getByTestId('price-value').querySelector('#price-value');
  const priceCurrencyInput = screen.getByTestId('price-value').querySelector(`#price-currency`);
  const priceTypeInput = screen.getByTestId('price-type').querySelector('#price-type');

  expect(offerNameInput).toBeInTheDocument();
  expect(durationInput).toBeInTheDocument();
  expect(priceValueInput).toBeInTheDocument();
  expect(priceCurrencyInput).toBeInTheDocument();
  expect(priceTypeInput).toBeInTheDocument();
});

const renderView = () =>
  renderWithProviders(
    <FacilityProvider value={facility}>
      <Offers />
    </FacilityProvider>,
    { route: '/offers?offset=0&limit=10' },
  );
