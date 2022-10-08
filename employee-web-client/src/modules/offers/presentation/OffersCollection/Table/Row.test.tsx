import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders, OfferFixture } from '../../../../../utils';

import { createTableConfigurationStore, GridTable } from '../../../../../shared/GridTable';
import { CollectionStoreProvider, createCollectionStore } from '../../../../../shared/Selectable';

import { offersTableConfig } from '../useOffersTableConfig';
import { Row } from './Row';

const OFFER_ID = '1';
const FACILITY_ID = '2';
const offer = OfferFixture.createPermutation({ offerId: OFFER_ID, facilityId: FACILITY_ID });

describe('OffersCollection', function () {
  it('should render row with proper status badge and button', function () {
    renderRow();

    expect(screen.getByLabelText('Deactivate offer')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should open dialog with proper confirmation', async function () {
    renderRow();

    await userEvent.click(screen.getByLabelText('Deactivate offer'));

    expect(screen.getByText('Are you sure to perform this operation? Offer will not be available.')).toBeInTheDocument();
  });
});

const renderRow = () => {
  renderWithProviders(
    <CollectionStoreProvider value={createCollectionStore<string>().getState()}>
      <GridTable count={1} id='offers' config={createTableConfigurationStore(offersTableConfig, 'offers').getState().config}>
        <Row offer={offer} index={0} />
      </GridTable>
    </CollectionStoreProvider>,
  );
};
