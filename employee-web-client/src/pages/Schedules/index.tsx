import React from 'react';
import { PageContainer } from 'shared/Layout/Page';
import { CollectionContainer } from 'shared/Collection';

import { compose } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { withPaginationParamsCorrector } from 'shared/Params';

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

export default compose(withErrorBoundary, withPaginationParamsCorrector(DEFAULT_PARAMS))(Schedules);
