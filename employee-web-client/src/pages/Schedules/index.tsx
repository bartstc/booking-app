import React from 'react';
import { PageContainer } from 'shared/Layout/Page';
import { CollectionContainer } from 'shared/Collection';

import { SchedulesCollection } from 'modules/schedules/presentation';

import { Header } from './Header';

const Schedules = () => {
  return (
    <PageContainer>
      <Header />
      <CollectionContainer>
        <SchedulesCollection />
      </CollectionContainer>
    </PageContainer>
  );
};

export default Schedules;
