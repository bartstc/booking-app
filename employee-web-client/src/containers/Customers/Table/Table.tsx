import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { getCustomers, getCustomersKey } from 'modules/customers/api';
import { useQueryParams } from 'shared/Params';
import { CustomerCollection } from 'modules/customers/types';

import { Header } from './Header';
import { Row } from './Row';

const facilityId = '83f0ac40-7bc7-48bd-a4de-8703c3485148';

const Table = () => {
  const { params } = useQueryParams();

  return (
    <FetchBoundary<CustomerCollection> queryKey={getCustomersKey(facilityId, params)} queryFn={() => getCustomers(facilityId, params)}>
      {({ data: { collection, meta } }) => (
        <>
          <Grid itemsCount={collection.length} rowGap={1} templateColumns='80px repeat(5, 1fr)' mb={4}>
            <Header />
            {collection.map((customer, index) => (
              <Row index={index + 1} key={index} customer={customer} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
