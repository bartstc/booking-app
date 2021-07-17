import React from 'react';

import { facilitiesQueryKey, facilitiesQuery } from 'modules/facility/infrastructure/query';
import { useEnterpriseContextSelector } from 'modules/context';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { Header } from './Header';
import { Row } from './Row';
import { IFacilityCollection, IFacilityCollectionQueryParams } from '../../../application/types';

const Table = () => {
  const { params } = useQueryParams<IFacilityCollectionQueryParams>();
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);

  return (
    <FetchBoundary<IFacilityCollection>
      queryKey={facilitiesQueryKey(enterpriseId, params)}
      queryFn={() => facilitiesQuery(enterpriseId, params)}
    >
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            templateColumns={{
              base: '80px repeat(2, 1fr) max(110px)',
              md: '80px repeat(4, 1fr) max(110px)',
              lg: '80px repeat(5, 1fr) max(110px)',
            }}
            mb={4}
          >
            <Header />
            {collection.map((facility, index) => (
              <Row index={index + 1 + Number(meta.offset)} key={facility.facilityId} facility={facility} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
