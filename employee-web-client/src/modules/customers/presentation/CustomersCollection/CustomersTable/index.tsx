import React from 'react';

import { Grid, GridFooter, Skeleton } from 'shared/Grid';
import { FetchBoundary } from 'shared/Suspense';
import { customersQueryKey, customersQuery } from 'modules/customers/infrastructure/query';
import { useQueryParams } from 'shared/Params';
import { useFacilityContextSelector } from 'modules/context';

import { Header } from './Header';
import { Row } from './Row';
import { ICustomerCollection, ICustomerCollectionQueryParams } from '../../../application/types';

const Table = () => {
  const { params } = useQueryParams<ICustomerCollectionQueryParams>();
  const { facilityId } = useFacilityContextSelector();

  return (
    <FetchBoundary<ICustomerCollection>
      queryKey={customersQueryKey(facilityId, params)}
      queryFn={() => customersQuery(facilityId, params)}
      fallback={<Skeleton />}
    >
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            templateColumns={{
              base: 'repeat(2, 1fr) max(110px)',
              md: 'repeat(4, 1fr) max(110px)',
              lg: 'repeat(5, 1fr) max(110px)',
            }}
            mb={4}
          >
            <Header />
            {collection.map(customer => (
              <Row key={customer.customerId} customer={customer} />
            ))}
          </Grid>
          <GridFooter meta={meta} collectionCount={collection.length} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
