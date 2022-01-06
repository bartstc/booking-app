import React from 'react';

import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { CollectionStoreProvider } from 'shared/Selectable';
import { GridTable, GridFooter, Skeleton } from 'shared/GridTable';

import { useFacilityContextSelector } from 'modules/context';
import { offersQueryKey, offersQuery } from 'modules/offers/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';
import { IOfferCollectionQueryParams } from '../../../application/types';
import { useOffersCollectionCheckboxStore } from '../../../application';
import { useOffersTableConfig } from '../useOffersTableConfig';

const Table = () => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const { facilityId } = useFacilityContextSelector();

  const store = useOffersCollectionCheckboxStore();
  const config = useOffersTableConfig(state => state.config);

  return (
    <FetchBoundary
      queryKey={offersQueryKey(facilityId, params)}
      queryFn={() => offersQuery(facilityId, params)}
      options={{
        keepPreviousData: true,
      }}
      fallback={<Skeleton />}
    >
      {({ data: { collection, meta } }) => (
        <CollectionStoreProvider value={store}>
          <GridTable count={collection.length} id='offers' config={config}>
            <Header collectionIds={collection.map(offer => offer.offerId)} />
            {collection.map(offer => (
              <Row key={offer.offerId} offer={offer} />
            ))}
          </GridTable>
          <GridFooter meta={meta} collectionCount={collection.length} />
        </CollectionStoreProvider>
      )}
    </FetchBoundary>
  );
};

export { Table };
