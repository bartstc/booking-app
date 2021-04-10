import React from 'react';
import { VStack } from '@chakra-ui/react';

import { PageWrapper } from 'shared/Layout/Page';

import { useModal } from 'hooks';

import { SchedulesCollection } from 'modules/schedules/presentation';
import { ICreateScheduleDto } from 'modules/schedules/application/types';

import { Header } from './Header';

const Schedules = () => {
  const { isOpen, onClose, onOpen } = useModal<ICreateScheduleDto | undefined>();

  return (
    <PageWrapper>
      <Header isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <SchedulesCollection />
      </VStack>
    </PageWrapper>
  );
};

export default Schedules;
