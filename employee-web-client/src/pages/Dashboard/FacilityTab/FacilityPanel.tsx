import React from 'react';
import { HStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { mdiArrowLeft, mdiContentSaveEdit } from '@mdi/js';

import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';
import { IFacility } from 'modules/facility/types';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { ContactMenu } from './ContactMenu';

interface IProps {
  facility: IFacility;
}

const FacilityPanel = ({ facility }: IProps) => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  const title = formatMessage({
    id: 'edit-facility-data',
    defaultMessage: 'Edit facility data',
  });

  return (
    <HStack w='100%' justify='space-between'>
      <IconButton
        onClick={() => push(buildUrl(`/dashboard/facilities`, DEFAULT_PARAMS))}
        variant='ghost'
        title={formatMessage({ id: 'bask-to-list', defaultMessage: 'Back to list' })}
        icon={<Icon path={mdiArrowLeft} />}
      />
      <HStack>
        {isMobileOnly ? (
          <IconButton
            onClick={() => push(`/dashboard/facilities/${facility.slug}/edit`)}
            colorScheme='blue'
            variant='solid'
            title={title}
            icon={<Icon path={mdiContentSaveEdit} />}
          />
        ) : (
          <Button
            onClick={() => push(`/dashboard/facilities/${facility.slug}/edit`)}
            colorScheme='blue'
            leftIcon={<Icon path={mdiContentSaveEdit} />}
          >
            {title}
          </Button>
        )}
        <ContactMenu {...facility.contactPerson} />
      </HStack>
    </HStack>
  );
};

export { FacilityPanel };
