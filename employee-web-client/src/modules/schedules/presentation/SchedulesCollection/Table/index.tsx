import React from 'react';

import { Grid, GridFooter } from 'shared/Grid';
import { FetchBoundary } from 'shared/Suspense';

import { useFacilityContextSelector } from 'modules/context';

import { Header } from './Header';
import { Row } from './Row';
import { schedulesQuery, schedulesQueryKey } from '../../../infrastructure/query';
import { IScheduleCollection } from '../../../application/types';

const Table = () => {
  const facilityId = useFacilityContextSelector(state => state.facilityId);

  return (
    <FetchBoundary<IScheduleCollection> queryKey={schedulesQueryKey(facilityId)} queryFn={() => schedulesQuery(facilityId)}>
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            mb={4}
          >
            <Header />
            {collection.map(schedule => (
              <Row key={schedule.name} schedule={schedule} />
            ))}
          </Grid>
          <GridFooter meta={meta} collectionCount={collection.length} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
