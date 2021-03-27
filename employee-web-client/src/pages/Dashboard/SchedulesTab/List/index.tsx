import React from 'react';
import { Grid } from '@chakra-ui/react';

import { useFacilityConsumer } from 'modules/context';
import { schedulesQuery, schedulesQueryKey } from 'modules/schedule/infrastructure/query';
import { IScheduleCollection } from 'modules/schedule/types';

import { useInfiniteQuery } from 'hooks/useInfiniteQuery';

import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { NoResultsState } from 'shared/States';

import { ListItem } from './ListItem';

const List = () => {
  const { facilityId } = useFacilityConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(schedulesQueryKey(facilityId), () => {
    return schedulesQuery(facilityId);
  });

  if (isLoading) {
    return <Spinner size='md' />;
  }

  if (!!data?.pages && data.pages[0]?.collection.length === 0) {
    return <NoResultsState />;
  }

  return (
    <Grid templateColumns='100%' w='100%' maxW='480px' mx='0 auto'>
      <InfinityList<IScheduleCollection> limit={limit} data={data?.pages} next={() => fetchNextPage()} hasMore={hasNextPage ?? true}>
        {({ collection }) => (
          <>
            {collection.map(schedule => (
              <ListItem key={schedule.name} schedule={schedule} />
            ))}
          </>
        )}
      </InfinityList>
    </Grid>
  );
};

export { List };
