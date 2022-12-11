import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { withParams } from 'utils/storybook';
import { managementMockService } from 'utils/mock';
import { FacilityFixture, generateID, MetaFixture, OfferFixture } from 'utils';

import { Currency } from 'types';

import { IOfferCollection, OfferStatus, PriceModel } from 'modules/offers/application/types';
import { offersQueryKey } from 'modules/offers/infrastructure/query';
import { FacilityProvider } from 'modules/context/application';
import Offers from './index';
import { OfferFormPO } from './OfferForm.po';

const FACILITY_ID = generateID();
const OFFER_ID_1 = generateID();
const OFFER_ID_2 = generateID();
const OFFER_ID_3 = generateID();

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

const offersList = [offer1, offer2];

managementMockService.patch(`facilities/${FACILITY_ID}/offers/${OFFER_ID_1}/activate`, {});
managementMockService.patch(`facilities/${FACILITY_ID}/offers/${OFFER_ID_2}/activate`, {});
managementMockService.patch(`facilities/${FACILITY_ID}/offers/${OFFER_ID_3}/activate`, {});
managementMockService.patch(`facilities/${FACILITY_ID}/offers/${OFFER_ID_1}/deactivate`, {});
managementMockService.patch(`facilities/${FACILITY_ID}/offers/${OFFER_ID_2}/deactivate`, {});
managementMockService.patch(`facilities/${FACILITY_ID}/offers/${OFFER_ID_3}/deactivate`, {});
managementMockService.post(`facilities/${FACILITY_ID}/offers`, (req, res, ctx) => {
  offersList.push(newOffer);

  return res(
    ctx.status(200),
    ctx.json({
      offerName: newOffer.name,
      duration: newOffer.duration.toString(),
      price: newOffer.price,
    }),
  );
});

export default {
  title: 'pages/OffersPage',
  component: Offers,
  decorators: [withParams()],
  parameters: {
    reactRouter: {
      routePath: '/offers',
      searchParams: { limit: 10, offset: 0, order: 'status' },
    },
  },
} as ComponentMeta<typeof Offers>;

const Template: ComponentStory<typeof Offers> = () => {
  return (
    <FacilityProvider value={facility}>
      <Offers />
    </FacilityProvider>
  );
};

export const OffersList = Template.bind({});
OffersList.decorators = [
  Story => {
    managementMockService.get<IOfferCollection>(offersQueryKey(FACILITY_ID)[0], {
      meta: MetaFixture.createPermutation({ total: 2 }),
      collection: offersList,
    });

    return <Story />;
  },
];

export const AddNewOffer = Template.bind({});
AddNewOffer.decorators = OffersList.decorators;
AddNewOffer.play = async ({ canvasElement }) => {
  const offerFormPo = OfferFormPO.render(canvasElement);

  await offerFormPo.expectLoaderDisappeared();

  await offerFormPo.openNewOfferForm();

  await offerFormPo.expectAddOfferFormAppeared();

  await offerFormPo.setOfferName(newOffer.name);
  await offerFormPo.setDuration(newOffer.duration);
  await offerFormPo.setPriceValue(newOffer.price.value);
  await offerFormPo.setPriceType('Variable');
  await offerFormPo.setPriceCurrency('PLN');

  await offerFormPo.submitNewOffer();

  await offerFormPo.expectAddOfferFormDisappeared();

  await offerFormPo.expectOfferNotificationAppeared();
  await offerFormPo.expectNewOfferAdded('New offer');
};

export const EmptyOffersList = Template.bind({});
EmptyOffersList.decorators = [
  Story => {
    managementMockService.get<IOfferCollection>(offersQueryKey(FACILITY_ID)[0], {
      meta: MetaFixture.createPermutation({ total: 0 }),
      collection: [],
    });

    return <Story />;
  },
];
