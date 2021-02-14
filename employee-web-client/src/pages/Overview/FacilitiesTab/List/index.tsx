import React from 'react';
import { Grid } from '@chakra-ui/react';

import { useEnterpriseConsumer } from 'modules/context';
import { IFacilityCollection, IFacilityCollectionQueryParams } from 'modules/facility/types';
import { getFacilities, getFacilitiesKey } from 'modules/facility/infrastructure/query';

import { useInfiniteQuery } from 'hooks';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { EmptyState } from 'shared/States';

import { ListItem } from './ListItem';

const List = () => {
  const { params } = useQueryParams<IFacilityCollectionQueryParams>();
  const { enterpriseId } = useEnterpriseConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(getFacilitiesKey(enterpriseId, params), ({ pageParam = 0 }) => {
    return getFacilities(enterpriseId, { ...params, limit, offset: pageParam });
  });

  if (isLoading) {
    return <Spinner size='md' />;
  }

  if (!!data?.pages && data.pages[0]?.collection.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid templateColumns='100%' w='100%' maxW='480px' mx='0 auto'>
      <InfinityList<IFacilityCollection> limit={limit} data={data?.pages} next={() => fetchNextPage()} hasMore={hasNextPage ?? true}>
        {({ collection }) => (
          <>
            {collection.map(facility => (
              <ListItem key={facility.facilityId} facility={facility} />
            ))}
          </>
        )}
      </InfinityList>
    </Grid>
  );
};

export { List };
