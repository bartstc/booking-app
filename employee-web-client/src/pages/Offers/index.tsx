import React from 'react';

import { compose } from 'utils';

import { CollectionContainer } from 'shared/Collection';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { withPaginationParamsCorrector } from 'shared/Params';
import { PageContainer } from 'shared/Layout/Page';

import { OffersCollection } from 'modules/offers/presentation';
import { OFFER_COLLECTION_DEFAULT_PARAMS } from 'modules/offers/application';
import { OffersCollectionToolbox } from 'modules/offers/presentation/OffersCollection/OffersCollectionToolbox';

import { Header } from './Header';

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

export default compose(withErrorBoundary, withPaginationParamsCorrector(OFFER_COLLECTION_DEFAULT_PARAMS))(Offers);
