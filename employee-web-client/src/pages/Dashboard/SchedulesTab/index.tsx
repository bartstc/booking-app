import React from 'react';
import { Box } from '@chakra-ui/react';
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
      <Panel showModal={onOpen} />
      <Box maxW='100%' m='0 auto' mt={{ base: 6, md: 10 }}>
        {isMobile ? <List /> : <Table />}
      </Box>
    </DashboardTabs>
  );
};

export default withErrorBoundary(SchedulesTab);
