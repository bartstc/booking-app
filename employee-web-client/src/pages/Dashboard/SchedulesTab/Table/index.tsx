import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';

import { useFacilityConsumer } from 'modules/context';
import { IScheduleCollection } from 'modules/schedule/types';
import { schedulesQueryKey, schedulesQuery } from 'modules/schedule/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';

const Table = () => {
  const { facilityId } = useFacilityConsumer();

  return (
    <FetchBoundary<IScheduleCollection> queryKey={schedulesQueryKey(facilityId)} queryFn={() => schedulesQuery(facilityId)}>
      {({ data: { collection } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            rowGap={1}
            templateColumns={{
              base: '80px repeat(2, 1fr)',
              md: '80px repeat(4, 1fr)',
              lg: '80px repeat(5, 1fr)',
            }}
            mb={4}
          >
            <Header />
            {collection.map((schedule, index) => (
              <Row index={index + 1} key={schedule.name} schedule={schedule} />
            ))}
          </Grid>
          <Pagination limit={1} total={1} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
