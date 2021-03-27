import React from 'react';
import { VStack } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { useModal } from 'hooks';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { ICreateScheduleDto } from 'modules/schedule/dto';

import { DashboardTabs } from '../DashboardTabs';
import { Table } from './Table';
import { List } from './List';
import { Panel } from './Panel';
import { CreateScheduleModal } from './CreateScheduleModal';

const SchedulesTab = () => {
  const { isOpen, onClose, data, onOpen } = useModal<ICreateScheduleDto | undefined>();

  return (
    <DashboardTabs>
      <CreateScheduleModal isOpen={isOpen} onClose={onClose} defaultData={data} />
      <VStack spacing={6}>
        <Panel showModal={onOpen} />
        {isMobile ? <List /> : <Table />}
      </VStack>
    </DashboardTabs>
  );
};

export default withErrorBoundary(SchedulesTab);
