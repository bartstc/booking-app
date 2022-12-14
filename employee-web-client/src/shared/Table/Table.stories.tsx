import React from 'react';
import { Badge, chakra, VStack, ButtonGroup } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mdiCogs, mdiPhone } from '@mdi/js';

import { generateID, MetaFixture } from 'utils';
import { withParams } from 'utils/storybook';
import { DefaultTable, DefaultTable as Table } from './DefaultTable';
import { dayjs } from 'utils/dayjs';

import { useFormatDate } from 'shared/DateV2';
import { MoneyText } from 'shared/Money';
import { IconButton } from 'shared/Button';

import { createColumn, useTable } from './useTable';
import { TContainer } from './TContainer';
import { Tfoot } from './Tfoot';
import { TLoader } from './TLoader';

interface ICompany {
  id: string;
  name: string;
  address: string;
  founder: string;
  foundedAt: string;
  capital: string;
  status: 'profit' | 'loss';
  phone: string;
}

const columnBuilder = createColumn<ICompany>();

const useColumns = () => {
  const formatDate = useFormatDate();

  return [
    columnBuilder.accessor(props => props, {
      id: 'name',
      cell: props => (
        <VStack align='flex-start'>
          <chakra.span fontWeight='700'>{props.getValue().name}</chakra.span>
          <chakra.span>{props.getValue().address}</chakra.span>
        </VStack>
      ),
      header: 'Company name',
      enableSorting: false,
    }),
    columnBuilder.accessor('founder', {
      id: 'founder',
      cell: props => props.getValue(),
      header: 'Founder',
      enableSorting: false,
    }),
    columnBuilder.accessor('foundedAt', {
      id: 'founded-at',
      header: 'Founded at',
      cell: props => formatDate(props.getValue()),
      enableSorting: true,
    }),
    columnBuilder.accessor('capital', {
      id: 'capital',
      header: 'Capital (USD)',
      cell: props => <MoneyText value={props.getValue()} />,
      enableSorting: true,
      meta: {
        isNumeric: true,
      },
    }),
    columnBuilder.accessor('status', {
      id: 'status',
      cell: props => (
        <Badge variant='subtle' colorScheme={props.getValue() === 'profit' ? 'green' : 'red'}>
          {props.getValue().toUpperCase()}
        </Badge>
      ),
      header: 'Status',
      enableSorting: true,
    }),
    columnBuilder.accessor(() => 'buttons', {
      id: 'buttons',
      header: '',
      cell: () => (
        <ButtonGroup>
          <IconButton title='Options' path={mdiCogs} size='md' />
          <IconButton title='Call me maybe' path={mdiPhone} size='md' />
        </ButtonGroup>
      ),
      enableSorting: false,
      meta: {
        isNumeric: true,
      },
    }),
  ];
};

const meta = MetaFixture.createPermutation({
  total: 2,
});
const companies: Array<ICompany> = [
  {
    id: generateID(),
    name: 'SpaceX',
    founder: 'Elon Musk',
    foundedAt: dayjs().format(),
    status: 'profit',
    capital: '15104000',
    address: 'NYC, Groove Street 84/12',
    phone: '+48 555777999',
  },
  {
    id: generateID(),
    name: 'Apple',
    founder: 'Steve Jobs',
    foundedAt: dayjs().format(),
    status: 'loss',
    capital: '2100000',
    address: 'Boston, Green Alley 124/8',
    phone: '+48 555333111',
  },
];

export default {
  title: 'components/Table',
  component: Table,
  decorators: [withParams()],
  parameters: {
    reactRouter: {
      routePath: '/companies',
      searchParams: { limit: 10, offset: 0 },
    },
  },
} as ComponentMeta<typeof Table>;

export const Default: ComponentStory<typeof Table> = () => {
  const columns = useColumns();

  const table = useTable({
    columns,
    data: companies,
  });

  return (
    <TContainer count={companies.length}>
      <DefaultTable table={table} />
      <Tfoot meta={meta} collectionCount={companies.length} />
    </TContainer>
  );
};

export const EmptyTable: ComponentStory<typeof Table> = () => {
  const columns = useColumns();

  const table = useTable({
    columns,
    data: [],
  });

  return (
    <TContainer count={0}>
      <DefaultTable table={table} />
      <Tfoot meta={meta} collectionCount={0} />
    </TContainer>
  );
};

export const LoadingTable: ComponentStory<typeof TLoader> = () => <TLoader />;
