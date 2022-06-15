import React from 'react';
import { VStack } from '@chakra-ui/react';

import { PageWrapper } from 'shared/Layout/Page';

import { SchedulesCollection } from 'modules/schedules/presentation';

import { Header } from './Header';

const Schedules = () => {
  return (
    <PageWrapper>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <SchedulesCollection />
      </VStack>
    </PageWrapper>
  );
};

export default Schedules;
