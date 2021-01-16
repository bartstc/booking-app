import React from 'react';
import { mdiFilter } from '@mdi/js';
import { useIntl } from 'react-intl';
import { Flex, HStack } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { IconButton } from 'shared/Button';

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
          id: 'search-facility-name',
          defaultMessage: `Type facility's name`,
        })}...`}
        filterName='name'
      />
      <HStack>{isMobileOnly ? <IconButton ml={4} title={title} variant='solid' path={mdiFilter} /> : <ClearFiltersIconButton />}</HStack>
    </Flex>
  );
};

export { Panel };
