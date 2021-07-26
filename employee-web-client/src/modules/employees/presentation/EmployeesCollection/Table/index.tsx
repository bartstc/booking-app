import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
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
            {collection.map((employee, index) => (
              <Row index={index + 1 + Number(meta.offset)} key={employee.employeeId} employee={employee} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
