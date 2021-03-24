import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { useFacilityConsumer } from 'modules/context';
import { IEmployeeCollection, IEmployeeCollectionQueryParams } from 'modules/employees/types';
import { employeesQueryKey, employeesQuery } from 'modules/employees/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';

const Table = () => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const { facilityId } = useFacilityConsumer();

  return (
    <FetchBoundary<IEmployeeCollection> queryKey={employeesQueryKey(facilityId, params)} queryFn={() => employeesQuery(facilityId, params)}>
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
            {collection.map((employee, index) => (
              <Row index={index + 1} key={employee.employeeId} employee={employee} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
