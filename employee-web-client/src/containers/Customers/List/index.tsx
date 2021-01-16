import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { Grid } from '@chakra-ui/react';

import { getCustomers, getCustomersKey } from 'modules/customers/api';
import { ICustomerCollection } from 'modules/customers/types';
import { useFacilityConsumer } from 'modules/context';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { EmptyState } from 'shared/States';

import { ListItem } from './ListItem';

const List = () => {
  const { params } = useQueryParams();
  const { facilityId } = useFacilityConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<ICustomerCollection>(
    getCustomersKey(facilityId, params),
    ({ pageParam = 10 }) => {
      return getCustomers(facilityId, { ...params, limit, offset: pageParam });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
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
      <InfinityList<ICustomerCollection> limit={limit} data={data?.pages} next={() => fetchNextPage()} hasMore={hasNextPage ?? true}>
        {({ collection }) => (
          <>
            {collection.map(customer => (
              <ListItem key={customer.customerId} customer={customer} />
            ))}
          </>
        )}
      </InfinityList>
    </Grid>
  );
};

export { List };
