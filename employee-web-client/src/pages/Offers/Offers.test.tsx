import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

import { FacilityFixture, OfferFixture, renderWithProviders, MetaFixture, muteConsoleBeforeEach } from 'utils';
import { managementMockService } from 'utils/mock';

import { IOfferCollection, OfferStatus, PriceModel } from 'modules/offers/application/types';
import { offersQueryKey } from 'modules/offers/infrastructure/query';
import { FacilityProvider } from 'modules/context/application';

import Offers from './index';
import { Currency } from '../../types';

const FACILITY_ID = '1';
const OFFER_ID_1 = '123';
const OFFER_ID_2 = '456';
const OFFER_ID_3 = '789';

const facility = FacilityFixture.createPermutation({ facilityId: FACILITY_ID });
const existingOffer1 = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_1,
  name: 'Existing offer',
  status: OfferStatus.Active,
});
const existingOffer2 = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_2,
  name: 'Existing offer',
  status: OfferStatus.Active,
});
const newOffer = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_3,
  name: 'New offer',
  status: OfferStatus.Active,
  duration: 60,
  price: {
    value: '100',
    type: PriceModel.Variable,
    currency: Currency.Pln,
  },
});

managementMockService.post(`facilities/${FACILITY_ID}/offers`, {
  offerName: newOffer.name,
  duration: newOffer.duration.toString(),
  price: newOffer.price,
});
managementMockService.get<IOfferCollection>(offersQueryKey(FACILITY_ID)[0], {
  meta: MetaFixture.createPermutation({ total: 3 }),
  collection: [existingOffer1, existingOffer2, newOffer],
});

// jest.setTimeout(10 * 1000);
muteConsoleBeforeEach();

it(
  'should add new offer to the list',
  async function () {
    managementMockService.getOnce<IOfferCollection>(offersQueryKey(FACILITY_ID)[0], {
      meta: MetaFixture.createPermutation({ total: 2 }),
      collection: [existingOffer1, existingOffer2],
    });

    renderView();
    await waitForElementToBeRemoved(screen.queryByTestId('table-loader'));
    expect(screen.getAllByText('Existing offer').length).toBe(2);

    await userEvent.click(screen.getByText('Add offer'));

    const form = screen.getByTestId('add-offer-form');
    expect(form).toBeInTheDocument();

    const offerNameInput = screen.getByLabelText(/Offer name/);
    const durationInput = screen.getByLabelText(/Duration of the service/);
    const priceValueInput = screen.getByLabelText(/Service's value/);
    const priceCurrencyInput = screen.getByLabelText(/Currency/);
    const priceTypeInput = screen.getByLabelText(/Price type/);

    await userEvent.type(offerNameInput, newOffer.name);
    await userEvent.type(durationInput, newOffer.duration.toString());
    await userEvent.type(priceValueInput, newOffer.price.value);
    await selectEvent.select(priceTypeInput, 'Variable');
    await selectEvent.select(priceCurrencyInput, 'PLN');

    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(form).not.toBeInTheDocument();
      expect(screen.getByText('New offer added successfully')).toBeInTheDocument();
      expect(screen.queryByText('New offer')).toBeInTheDocument();
    });
  },
  10 * 1000,
);

const renderView = () =>
  renderWithProviders(
    <FacilityProvider value={facility}>
      <Offers />
    </FacilityProvider>,
    { route: '/offers?offset=0&limit=10' },
  );
