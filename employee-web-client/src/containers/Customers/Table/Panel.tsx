import React from 'react';
import { mdiFilter } from '@mdi/js';
import { FormattedMessage, useIntl } from 'react-intl';
import { Flex, HStack } from '@chakra-ui/react';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Panel = () => {
  const { formatMessage } = useIntl();

  return (
    <Flex justify='space-between' w='100%' mb={4}>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-customer-name',
          defaultMessage: `Type customer's name`,
        })}...`}
      />
      <HStack>
        <ClearFiltersIconButton />
        <Button colorScheme='gray' leftIcon={<Icon path={mdiFilter} />}>
          <FormattedMessage id='filters' defaultMessage='Filters' />
        </Button>
      </HStack>
    </Flex>
  );
};

export { Panel };
