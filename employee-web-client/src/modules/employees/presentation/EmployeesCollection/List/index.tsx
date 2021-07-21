import React from 'react';
import { Grid } from '@chakra-ui/react';

import { employeesQuery, employeesQueryKey } from 'modules/employees/infrastructure/query';
import { useEnterpriseContextSelector } from 'modules/context';

import { useInfiniteQuery } from 'hooks/useInfiniteQuery';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { NoResultsState } from 'shared/States';

import { ListItem } from './ListItem';
import { IEmployeeCollectionQueryParams, IEmployeeCollection } from '../../../application/types';

const List = () => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(employeesQueryKey(enterpriseId, params), ({ pageParam = 0 }) => {
    return employeesQuery(enterpriseId, { ...params, limit, offset: pageParam });
  });

  if (isLoading) {
    return <Spinner size='md' />;
  }

  if (!!data?.pages && data.pages[0]?.collection.length === 0) {
    return <NoResultsState />;
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
