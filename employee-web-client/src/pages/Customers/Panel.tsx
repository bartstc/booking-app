import React from 'react';
import { useIntl } from 'react-intl';
import { ButtonGroup } from '@chakra-ui/react';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { CollectionPanel } from 'shared/Collection';

const Panel = () => {
  const { formatMessage } = useIntl();

  return (
    <CollectionPanel>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-customer-name',
          defaultMessage: `Type customer's name`,
        })}...`}
        filterName='fullName'
      />
      <ButtonGroup>
        <ClearFiltersIconButton />
      </ButtonGroup>
    </CollectionPanel>
  );
};

export { Panel };
