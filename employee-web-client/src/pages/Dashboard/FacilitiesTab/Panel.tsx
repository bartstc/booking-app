import React from 'react';
import { useIntl } from 'react-intl';
import { Flex, HStack } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiAccount } from '@mdi/js';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Panel = () => {
  const { formatMessage } = useIntl();

  const title = formatMessage({
    id: 'add-facility',
    defaultMessage: 'Add facility',
  });

  return (
    <Flex justify='space-between' w='100%' mb={{ base: 2, md: 4 }}>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-facility-name',
          defaultMessage: `Type facility's name`,
        })}...`}
        filterName='name'
      />
      <HStack>
        {isMobileOnly ? (
          <IconButton ml={2} colorScheme='primary' variant='solid' title={title} icon={<Icon path={mdiAccount} color='gray.800' />} />
        ) : (
          <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />}>
            {title}
          </Button>
        )}
        <ClearFiltersIconButton ml={4} />
      </HStack>
    </Flex>
  );
};

export { Panel };
