import React from 'react';
import { mdiFilter } from '@mdi/js';
import { useIntl } from 'react-intl';
import { Flex, HStack } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Panel = () => {
  const { formatMessage } = useIntl();

  const title = formatMessage({
    id: 'filters',
    defaultMessage: 'Filters',
  });

  return (
    <Flex justify='space-between' w='100%' mb={{ base: 2, md: 4 }}>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-customer-name',
          defaultMessage: `Type customer's name`,
        })}...`}
      />
      <HStack>
        {isMobileOnly ? (
          <IconButton ml={4} title={title} variant='solid' path={mdiFilter} />
        ) : (
          <>
            <ClearFiltersIconButton />
            <Button colorScheme='gray' leftIcon={<Icon path={mdiFilter} />}>
              {title}
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export { Panel };
