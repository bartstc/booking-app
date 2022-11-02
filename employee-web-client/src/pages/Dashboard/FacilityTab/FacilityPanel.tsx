import React from 'react';
import { HStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { mdiArrowLeft, mdiContentSaveEdit } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { IFacility } from 'modules/facility/application/types';

import { ContactMenu } from './ContactMenu';

interface IProps {
  facility: IFacility;
}

const FacilityPanel = ({ facility }: IProps) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const title = formatMessage({
    id: 'edit-facility-data',
    defaultMessage: 'Edit facility data',
  });

  return (
    <HStack w='100%' justify='space-between'>
      <IconButton
        onClick={() => navigate(`/dashboard/facilities`)}
        variant='ghost'
        title={formatMessage({ id: 'back-to-list', defaultMessage: 'Back to list' })}
        icon={<Icon path={mdiArrowLeft} />}
      />
      <HStack>
        {isMobileOnly ? (
          <IconButton
            onClick={() => navigate(`/dashboard/facilities/${facility.slug}/edit`)}
            colorScheme='gray'
            variant='solid'
            title={title}
            icon={<Icon path={mdiContentSaveEdit} />}
          />
        ) : (
          <Button
            onClick={() => navigate(`/dashboard/facilities/${facility.slug}/edit`)}
            colorScheme='gray'
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
