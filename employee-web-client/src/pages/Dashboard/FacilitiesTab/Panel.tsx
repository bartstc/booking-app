import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiHomePlus } from '@mdi/js';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { CollectionPanel } from 'shared/Collection';
import { Icon } from 'shared/Icon';

const Panel = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const title = formatMessage({
    id: 'add-facility',
    defaultMessage: 'Add facility',
  });

  return (
    <CollectionPanel>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-facility-name',
          defaultMessage: `Type facility's name`,
        })}...`}
        filterName='name'
      />
      <ButtonGroup>
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
      </ButtonGroup>
    </CollectionPanel>
  );
};

export { Panel };
