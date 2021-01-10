import React from 'react';
import { VStack } from '@chakra-ui/react';

import { Table, Panel } from './Table';
import { Header } from './Header';

const Customers = () => {
  return (
    <VStack spacing={{ base: 10, md: 16 }} w='100%' mt={{ base: 4, md: 10 }} px={{ base: 4, md: 8 }} maxW='1280px' margin='0 auto'>
      <Header />
      <VStack w='100%' maxW='1080px' pb={{ base: 4, md: 10 }}>
        <Panel />
        <Table />
      </VStack>
    </VStack>
  );
};

export default Customers;
