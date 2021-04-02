import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Flex, HStack } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiHomePlus } from '@mdi/js';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Panel = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

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
          <IconButton
            onClick={() => push('/dashboard/create-facility')}
            ml={2}
            colorScheme='primary'
            variant='solid'
            title={title}
            icon={<Icon path={mdiHomePlus} color='gray.800' />}
          />
        ) : (
          <Button onClick={() => push('/dashboard/create-facility')} colorScheme='primary' leftIcon={<Icon path={mdiHomePlus} />}>
            {title}
          </Button>
        )}
        <ClearFiltersIconButton ml={4} />
      </HStack>
    </Flex>
  );
};

export { Panel };
