import React from 'react';
import { Grid } from '@chakra-ui/react';

import { getEmployees, getEmployeesKey } from 'modules/employees/infrastructure/query';
import { IEmployeeCollection, IEmployeeCollectionQueryParams } from 'modules/employees/types';
import { useFacilityConsumer } from 'modules/context';

import { useInfiniteQuery } from 'hooks/useInfiniteQuery';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { EmptyState } from 'shared/States';

import { ListItem } from './ListItem';

const List = () => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const { facilityId } = useFacilityConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(getEmployeesKey(facilityId, params), ({ pageParam = 0 }) => {
    return getEmployees(facilityId, { ...params, limit, offset: pageParam });
  });

  if (isLoading) {
    return <Spinner size='md' />;
  }

  if (!!data?.pages && data.pages[0]?.collection.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid templateColumns='100%' w='100%' maxW='480px' mx='0 auto'>
      <InfinityList<IEmployeeCollection> limit={limit} data={data?.pages} next={() => fetchNextPage()} hasMore={hasNextPage ?? true}>
        {({ collection }) => (
          <>
            {collection.map(employee => (
              <ListItem key={employee.employeeId} employee={employee} />
            ))}
          </>
        )}
      </InfinityList>
    </Grid>
  );
};

export { List };
