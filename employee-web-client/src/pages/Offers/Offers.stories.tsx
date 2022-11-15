import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { withParams } from 'utils/storybook';
import { managementMockService } from 'utils/mock';
import { FacilityFixture, generateID, MetaFixture, OfferFixture } from 'utils';

import { IOfferCollection, OfferStatus } from 'modules/offers/application/types';
import { offersQueryKey } from 'modules/offers/infrastructure/query';
import { FacilityProvider } from 'modules/context/application';
import Offers from './index';

const FACILITY_ID = generateID();
const OFFER_ID_1 = generateID();
const OFFER_ID_2 = generateID();

const facility = FacilityFixture.createPermutation({ facilityId: FACILITY_ID });
const offer1 = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_1,
  name: 'Existing offer 1',
  status: OfferStatus.Active,
});
const offer2 = OfferFixture.createPermutation({
  facilityId: FACILITY_ID,
  offerId: OFFER_ID_2,
  name: 'Existing offer 2',
  status: OfferStatus.Active,
});

managementMockService.get<IOfferCollection>(offersQueryKey(FACILITY_ID)[0], {
  meta: MetaFixture.createPermutation({ total: 2 }),
  collection: [offer1, offer2],
});

export default {
  title: 'pages/OffersPage',
  component: Offers,
  decorators: [withParams()],
} as ComponentMeta<typeof Offers>;

const Template: ComponentStory<typeof Offers> = () => {
  return (
    <FacilityProvider value={facility}>
      <Offers />
    </FacilityProvider>
  );
};

export const Default = Template.bind({});
