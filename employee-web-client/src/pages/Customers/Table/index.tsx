import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { customersQueryKey, customersQuery } from 'modules/customers/infrastructure/query';
import { useQueryParams } from 'shared/Params';
import { ICustomerCollection, ICustomerCollectionQueryParams } from 'modules/customers/types';
import { useFacilityConsumer } from 'modules/context';

import { Header } from './Header';
import { Row } from './Row';

const Table = () => {
  const { params } = useQueryParams<ICustomerCollectionQueryParams>();
  const { facilityId } = useFacilityConsumer();

  return (
    <FetchBoundary<ICustomerCollection> queryKey={customersQueryKey(facilityId, params)} queryFn={() => customersQuery(facilityId, params)}>
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
            {collection.map((customer, index) => (
              <Row index={index + 1} key={customer.customerId} customer={customer} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
