import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Flex, HStack } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiHomePlus } from '@mdi/js';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Panel = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const title = formatMessage({
    id: 'add-facility',
    defaultMessage: 'Add facility',
  });

  return (
    <Flex justify='space-between' w='100%'>
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
            onClick={() => navigate('/dashboard/new-facility')}
            ml={2}
            colorScheme='primary'
            title={title}
            icon={<Icon path={mdiHomePlus} color='gray.800' />}
          />
        ) : (
          <Button onClick={() => navigate('/dashboard/new-facility')} colorScheme='primary' leftIcon={<Icon path={mdiHomePlus} />}>
            {title}
          </Button>
        )}
        <ClearFiltersIconButton ml={4} />
      </HStack>
    </Flex>
  );
};

export { Panel };
