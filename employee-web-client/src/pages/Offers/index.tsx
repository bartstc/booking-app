import React from 'react';
import { VStack } from '@chakra-ui/react';

import { PageWrapper } from 'shared/Layout/Page';
import { OffersCollection } from 'modules/offers/presentation';

import { Header } from './Header';
import { OffersCollectionToolbox } from '../../modules/offers/presentation/OffersCollection/OffersCollectionToolbox';

const Offers = () => {
  return (
    <PageWrapper>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <OffersCollectionToolbox />
        <OffersCollection />
      </VStack>
    </PageWrapper>
  );
};

export default Offers;
