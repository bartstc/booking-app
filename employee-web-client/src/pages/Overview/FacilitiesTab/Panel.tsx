import React from 'react';
import { useIntl } from 'react-intl';
import { Flex, HStack } from '@chakra-ui/react';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';

const Panel = () => {
  const { formatMessage } = useIntl();

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
        <ClearFiltersIconButton ml={4} />
      </HStack>
    </Flex>
  );
};

export { Panel };
