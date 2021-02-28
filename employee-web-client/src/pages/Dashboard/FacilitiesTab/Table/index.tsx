import React from 'react';

import { IFacilityCollection, IFacilityCollectionQueryParams } from 'modules/facility/types';
import { getFacilities, getFacilitiesKey } from 'modules/facility/infrastructure/query';
import { useEnterpriseConsumer } from 'modules/context';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { Header } from './Header';
import { Row } from './Row';

const Table = () => {
  const { params } = useQueryParams<IFacilityCollectionQueryParams>();
  const { enterpriseId } = useEnterpriseConsumer();

  return (
    <FetchBoundary<IFacilityCollection>
      queryKey={getFacilitiesKey(enterpriseId, params)}
      queryFn={() => getFacilities(enterpriseId, params)}
    >
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            rowGap={1}
            templateColumns={{
              base: '80px repeat(2, 1fr) max(110px)',
              md: '80px repeat(4, 1fr) max(110px)',
              lg: '80px repeat(5, 1fr) max(110px)',
            }}
            mb={4}
          >
            <Header />
            {collection.map((facility, index) => (
              <Row index={index + 1} key={facility.facilityId} facility={facility} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
