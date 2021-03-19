import React from 'react';
import { Grid } from '@chakra-ui/react';

import { getCustomers, getCustomersKey } from 'modules/customers/infrastructure/query';
import { ICustomerCollection, ICustomerCollectionQueryParams } from 'modules/customers/types';
import { useFacilityConsumer } from 'modules/context';

import { useInfiniteQuery } from 'hooks/useInfiniteQuery';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { NoResultsState } from 'shared/States';

import { ListItem } from './ListItem';

const List = () => {
  const { params } = useQueryParams<ICustomerCollectionQueryParams>();
  const { facilityId } = useFacilityConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(getCustomersKey(facilityId, params), ({ pageParam = 0 }) => {
    return getCustomers(facilityId, { ...params, limit, offset: pageParam });
  });

  if (isLoading) {
    return <Spinner size='md' />;
  }

  if (!!data?.pages && data.pages[0]?.collection.length === 0) {
    return <NoResultsState />;
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
