import React from 'react';
import { HStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { mdiContentSaveEdit } from '@mdi/js';

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
    <HStack w='100%' justify='flex-end'>
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
          onClick={() => push('/dashboard/facilities/:facilitySlug/edit')}
          colorScheme='blue'
          leftIcon={<Icon path={mdiContentSaveEdit} />}
        >
          {title}
        </Button>
      )}
      <ContactMenu {...facility.contactPerson} />
    </HStack>
  );
};

export { FacilityPanel };
