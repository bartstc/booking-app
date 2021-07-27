import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { useFacilityContextSelector } from 'modules/context';
import { offersQueryKey, offersQuery } from 'modules/offers/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';
import { IOfferCollection, IOfferCollectionQueryParams } from '../../../application/types';

const Table = () => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const { facilityId } = useFacilityContextSelector();

  return (
    <FetchBoundary<IOfferCollection>
      queryKey={offersQueryKey(facilityId, params)}
      queryFn={() => offersQuery(facilityId, params)}
      options={{
        keepPreviousData: true,
      }}
    >
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            templateColumns={{
              base: '80px repeat(2, 1fr) max(110px)',
              md: '80px 2fr repeat(3, 1fr) max(110px)',
              lg: '80px 2fr repeat(4, 1fr) max(110px)',
            }}
            mb={4}
          >
            <Header />
            {collection.map((offer, index) => (
              <Row index={index + 1 + Number(meta.offset)} key={offer.offerId} offer={offer} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
