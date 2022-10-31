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
          id: 'search-employee-name-or-position',
          defaultMessage: `Type employee's name, position`,
        })}...`}
      />
      <ButtonGroup>
        <ClearFiltersIconButton ml={4} />
      </ButtonGroup>
    </CollectionPanel>
  );
};

export { Panel };
