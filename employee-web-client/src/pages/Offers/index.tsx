import React from 'react';

import { PageWrapper } from 'shared/Layout/Page';
import { OffersCollection } from 'modules/offers/presentation/OffersCollection';

const Offers = () => {
  return (
    <PageWrapper>
      <OffersCollection />
    </PageWrapper>
  );
};

export default Offers;
