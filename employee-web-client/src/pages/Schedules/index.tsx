import React from 'react';
import { VStack } from '@chakra-ui/react';

import { PageContainer } from 'shared/Layout/Page';

import { SchedulesCollection } from 'modules/schedules/presentation';

import { Header } from './Header';

const Schedules = () => {
  return (
    <PageContainer>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <SchedulesCollection />
      </VStack>
    </PageContainer>
  );
};

export default Schedules;
