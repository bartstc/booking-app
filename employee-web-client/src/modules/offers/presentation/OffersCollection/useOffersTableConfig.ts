import { ITableConfig, createTableConfigurationStore } from 'shared/GridTable';

const offersTableConfig: ITableConfig = {
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

export const useOffersTableConfig = createTableConfigurationStore(offersTableConfig, 'offers');
