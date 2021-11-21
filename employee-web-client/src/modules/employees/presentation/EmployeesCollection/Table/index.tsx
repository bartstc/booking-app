import React from 'react';

import { Grid, GridFooter, Skeleton } from 'shared/Grid';
import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { useEnterpriseContextSelector } from 'modules/context';
import { employeesQueryKey, employeesQuery } from 'modules/employees/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';
import { IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../../application/types';

const Table = () => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);

  return (
    <FetchBoundary<IEmployeeCollection>
      queryKey={employeesQueryKey(enterpriseId, params)}
      queryFn={() => employeesQuery(enterpriseId, params)}
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
            {collection.map(employee => (
              <Row key={employee.employeeId} employee={employee} />
            ))}
          </Grid>
          <GridFooter meta={meta} collectionCount={collection.length} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
