import React from 'react';
import { useIntl } from 'react-intl';
import { HStack } from '@chakra-ui/react';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';

const Panel = () => {
  const { formatMessage } = useIntl();

  return (
    <HStack minH='56px' justify='space-between' w='100%'>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-customer-name',
          defaultMessage: `Type customer's name`,
        })}...`}
        filterName='fullName'
      />
      <HStack>
        <ClearFiltersIconButton ml={4} />
      </HStack>
    </HStack>
  );
};

export { Panel };
