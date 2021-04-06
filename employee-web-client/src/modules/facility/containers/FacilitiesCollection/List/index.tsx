import React from 'react';
import { Grid } from '@chakra-ui/react';

import { useEnterpriseConsumer } from 'modules/context';
import { facilitiesQuery, facilitiesQueryKey } from 'modules/facility/presentation/query';

import { useInfiniteQuery } from 'hooks';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { NoResultsState } from 'shared/States';

import { ListItem } from './ListItem';
import { IFacilityCollection, IFacilityCollectionQueryParams } from '../../../application/types';

const List = () => {
  const { params } = useQueryParams<IFacilityCollectionQueryParams>();
  const { enterpriseId } = useEnterpriseConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    facilitiesQueryKey(enterpriseId, params),
    ({ pageParam = 0 }) => {
      return facilitiesQuery(enterpriseId, { ...params, limit, offset: pageParam });
    },
  );

  if (isLoading) {
    return <Spinner size='md' />;
  }

  if (!!data?.pages && data.pages[0]?.collection.length === 0) {
    return <NoResultsState />;
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
