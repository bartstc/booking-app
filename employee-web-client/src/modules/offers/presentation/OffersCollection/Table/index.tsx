import React from 'react';

import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { CollectionStoreProvider } from 'shared/Selectable';
import { GridTable, ITableConfig, GridFooter, Skeleton } from 'shared/GridTable';

import { useFacilityContextSelector } from 'modules/context';
import { offersQueryKey, offersQuery } from 'modules/offers/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';
import { IOfferCollection, IOfferCollectionQueryParams } from '../../../application/types';
import { useOffersCollectionCheckboxStore } from '../../../application';

const tableConfig: ITableConfig = {
  checkbox: {
    gridValue: '54px',
    isVisible: true,
  },
  name: {
    gridValue: '2fr',
    isVisible: true,
  },
  status: {
    gridValue: '1fr',
    isVisible: true,
    isSortable: true,
    display: { base: 'none', md: 'flex' },
  },
  duration: {
    gridValue: '1fr',
    isVisible: true,
    display: { base: 'none', md: 'flex' },
  },
  price: {
    gridValue: '1fr',
    isVisible: true,
  },
  priceType: {
    gridValue: '1fr',
    isVisible: true,
    isSortable: true,
    display: { base: 'none', lg: 'flex' },
  },
  actions: {
    gridValue: 'max(110px)',
    isVisible: true,
  },
};

const Table = () => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const { facilityId } = useFacilityContextSelector();
  const store = useOffersCollectionCheckboxStore();

  return (
    <FetchBoundary<IOfferCollection>
      queryKey={offersQueryKey(facilityId, params)}
      queryFn={() => offersQuery(facilityId, params)}
      options={{
        keepPreviousData: true,
      }}
      fallback={<Skeleton />}
    >
      {({ data: { collection, meta } }) => (
        <CollectionStoreProvider value={store}>
          <GridTable count={collection.length} id='offers' config={tableConfig}>
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
