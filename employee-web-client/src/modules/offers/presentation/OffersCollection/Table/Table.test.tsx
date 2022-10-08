import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FacilityFixture, OfferFixture, renderWithProviders, mockResponseFactory, MetaFixture } from 'utils';
import { managementMockService } from 'utils/mock';

import { Table } from './index';
import { IOfferCollection, OfferStatus } from '../../../application/types';
import { FacilityProvider } from '../../../../context/application';
import React from 'react';
import { offersQueryKey } from '../../../infrastructure/query';

const FACILITY_ID = '1';
const OFFER_ID_1 = '123';
const OFFER_ID_2 = '456';

const facility = FacilityFixture.createPermutation({ facilityId: FACILITY_ID });
const offer_1 = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_1,
  name: 'First offer',
  status: OfferStatus.Active,
});
const offer_2 = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_2,
  name: 'Second offer',
  status: OfferStatus.Inactive,
});

const mockOffers = mockResponseFactory<IOfferCollection>(
  {
    meta: MetaFixture.createPermutation({ total: 2 }),
    collection: [offer_1, offer_2],
  },
  resp => managementMockService.get(offersQueryKey(FACILITY_ID)[0], resp),
);

describe('OffersCollection', function () {
  it('should render table with two rows', async function () {
    const { collection } = mockOffers();
    renderTable();

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      collection.forEach(offer => {
        expect(screen.getByText(offer.name)).toBeInTheDocument();
      });
    });
  });

  it('should render row with active offer', async function () {
    mockOffers({ collection: [offer_1], meta: MetaFixture.createPermutation({ total: 1 }) });
    renderTable();

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByLabelText('Deactivate offer')).toBeInTheDocument();
    });
  });

  it('should render row with inactive offer', async function () {
    mockOffers({ collection: [offer_2], meta: MetaFixture.createPermutation({ total: 1 }) });
    renderTable();

    await waitFor(() => {
      expect(screen.getByText('Inactive')).toBeInTheDocument();
      expect(screen.getByLabelText('Activate offer')).toBeInTheDocument();
    });
  });

  it('should deactivate active offer', async function () {
    mockOffers({ collection: [offer_1] });
    managementMockService.patch(`facilities/${FACILITY_ID}/offers/${OFFER_ID_1}/deactivate`, {});

    renderTable();

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    // https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-waitfor-to-wait-for-elements-that-can-be-queried-with-find
    const deactivateButton = await screen.findByLabelText('Deactivate offer');
    await userEvent.click(deactivateButton);

    const warningMessage = screen.getByText('Are you sure to perform this operation? Offer will not be available.');
    expect(warningMessage).toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(warningMessage).not.toBeInTheDocument();
      expect(screen.getByText('Offer was successfully deactivated')).toBeInTheDocument();
      expect(screen.getByText('Inactive')).toBeInTheDocument();
    });
  });
});

const renderTable = () =>
  renderWithProviders(
    <FacilityProvider value={facility}>
      <Table />
    </FacilityProvider>,
    { route: '/offers?offset=0&limit=10' },
  );
