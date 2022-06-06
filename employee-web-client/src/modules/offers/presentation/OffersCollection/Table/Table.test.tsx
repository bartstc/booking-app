import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FacilityFixture, OfferFixture, renderWithProviders, mockResponseFactory, MetaFixture } from '../../../../../utils';

import { Table } from './index';
import { IOfferCollection, OfferStatus } from '../../../application/types';
import { FacilityProvider } from '../../../../context/application';
import React from 'react';
import { managementMockService } from '../../../../../utils/mock';
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
});

const renderTable = () =>
  renderWithProviders(
    <FacilityProvider value={facility}>
      <Table />
    </FacilityProvider>,
    { route: '/offers?offset=0&limit=10' },
  );
