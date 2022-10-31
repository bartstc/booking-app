import React from 'react';

import { PageContainer } from 'shared/Layout/Page';
import { OffersCollection } from 'modules/offers/presentation';

import { Header } from './Header';
import { OffersCollectionToolbox } from '../../modules/offers/presentation/OffersCollection/OffersCollectionToolbox';
import { CollectionContainer } from '../../shared/Collection';

const Offers = () => {
  return (
    <PageContainer>
      <Header />
      <CollectionContainer>
        <OffersCollectionToolbox />
        <OffersCollection />
      </CollectionContainer>
    </PageContainer>
  );
};

export default Offers;
