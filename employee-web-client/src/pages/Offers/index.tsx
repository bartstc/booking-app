import React from 'react';
import { VStack } from '@chakra-ui/react';

import { PageContainer } from 'shared/Layout/Page';
import { OffersCollection } from 'modules/offers/presentation';

import { Header } from './Header';
import { OffersCollectionToolbox } from '../../modules/offers/presentation/OffersCollection/OffersCollectionToolbox';

const Offers = () => {
  return (
    <PageContainer>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <OffersCollectionToolbox />
        <OffersCollection />
      </VStack>
    </PageContainer>
  );
};

export default Offers;
