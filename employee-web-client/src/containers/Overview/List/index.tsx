import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { Grid } from '@chakra-ui/react';

import { useEnterpriseConsumer } from 'modules/context';
import { IFacilityCollection, IFacilityCollectionQueryParams } from 'modules/facility/types';
import { getFacilities, getFacilitiesKey } from 'modules/facility/api';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { EmptyState } from 'shared/States';

import { ListItem } from './ListItem';

const List = () => {
  const { params } = useQueryParams<IFacilityCollectionQueryParams>();
  const { enterpriseId } = useEnterpriseConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<IFacilityCollection>(
    getFacilitiesKey(enterpriseId, params),
    ({ pageParam = 0 }) => {
      return getFacilities(enterpriseId, { ...params, limit, offset: pageParam });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.collection.length <= 10) {
          return 0;
        }

        const pageNumber = Math.ceil(lastPage.meta.total / limit);
        if (lastPage.meta.total <= limit) return false;
        if (pageNumber === allPages.length) return false;
        return Number(lastPage.meta.offset) + limit;
      },
    },
  );

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
