import React from 'react';
import { mdiDeleteOutline, mdiFilter, mdiFormatListChecks, mdiLockOutline, mdiTableLargeRemove } from '@mdi/js';
import { useIntl } from 'react-intl';
import { HStack, Text, ButtonGroup, Divider, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import shallow from 'zustand/shallow';

import { FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { Confirm } from 'shared/Confirm';
import { TableConfigButton } from 'shared/GridTable';

import { useNotImplementedYet } from 'hooks';

import { useOffersCollectionCheckboxStore } from '../../application';
import { OffersCollectionFiltersModal } from './OffersCollectionFiltersModal';
import { useOffersTableConfig } from './useOffersTableConfig';
import { useOffersColumnsLabels } from './useOffersColumnsLabels';

const OffersCollectionToolbox = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const items = useOffersCollectionCheckboxStore(store => store.items);
  const config = useOffersTableConfig(state => ({ config: state.config, toggle: state.toggle }), shallow);

  const labels = useOffersColumnsLabels();

  const title = formatMessage({
    id: 'filters',
    defaultMessage: 'Filters',
  });

  if (items.length > 0) {
    return <SelectedToolbox />;
  }

  return (
    <HStack minH='56px' justify='space-between' w='100%'>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-employee-name-or-position',
          defaultMessage: `Type offer's name`,
        })}...`}
        filterName='name'
      />
      <HStack>
        <OffersCollectionFiltersModal isOpen={isOpen} onClose={onClose} />
        {isMobileOnly ? (
          <IconButton ml={4} title={title} variant='solid' path={mdiFilter} onClick={onOpen} />
        ) : (
          <>
            <Button colorScheme='gray' onClick={onOpen} leftIcon={<Icon path={mdiFilter} />}>
              {title}
            </Button>
            <TableConfigButton {...config} columnsLabels={labels} tableId='offers' />
          </>
        )}
      </HStack>
    </HStack>
  );
};

const SelectedToolbox = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notImplementedYet = useNotImplementedYet();

  const backgroundColor = useColorModeValue('primary.100', 'primary.300');
  const color = useColorModeValue('gray.900', 'gray.900');

  const items = useOffersCollectionCheckboxStore(store => store.items);
  const clear = useOffersCollectionCheckboxStore(store => store.clear);

  return (
    <HStack minH='56px' borderRadius='7px' px={4} background={backgroundColor} justify='space-between' w='100%'>
      <Confirm isOpen={isOpen} onClose={onClose} onConfirm={clear} />
      <HStack>
        <HStack spacing={1}>
          <IconButton
            icon={<Icon path={mdiTableLargeRemove} color={color} />}
            title={formatMessage({ id: 'clear-all', defaultMessage: 'Clear all' })}
            onClick={onOpen}
          />
          <IconButton
            icon={<Icon path={mdiFormatListChecks} color={color} />}
            title={formatMessage({ id: 'check-on-all-pages', defaultMessage: 'Check on all pages' })}
            onClick={notImplementedYet}
          />
        </HStack>
        <Divider w='1px' h='30px' background={color} orientation='vertical' />
        <Text pl={2} fontWeight='500' color={color}>
          {formatMessage(
            { id: 'toolbox-selected', defaultMessage: '{count} items selected' },
            {
              count: <strong>{items.length}</strong>,
            },
          )}
        </Text>
      </HStack>
      <ButtonGroup>
        <Button variant='ghost' onClick={notImplementedYet} color={color} leftIcon={<Icon path={mdiLockOutline} color={color} />}>
          {formatMessage({ id: 'deactivate', defaultMessage: 'Deactivate' })}
        </Button>
        <Button variant='ghost' onClick={notImplementedYet} color={color} leftIcon={<Icon path={mdiDeleteOutline} color={color} />}>
          {formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
        </Button>
      </ButtonGroup>
    </HStack>
  );
};

export { OffersCollectionToolbox };
