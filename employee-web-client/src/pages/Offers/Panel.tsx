import React from 'react';
import { mdiFilter } from '@mdi/js';
import { useIntl } from 'react-intl';
import { Flex, HStack, useDisclosure } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { OffersCollectionFiltersModal } from 'modules/offers/presentation';

const Panel = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = formatMessage({
    id: 'filters',
    defaultMessage: 'Filters',
  });

  return (
    <Flex justify='space-between' w='100%'>
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
            <ClearFiltersIconButton />
            <Button colorScheme='gray' onClick={onOpen} leftIcon={<Icon path={mdiFilter} />}>
              {title}
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export { Panel };
