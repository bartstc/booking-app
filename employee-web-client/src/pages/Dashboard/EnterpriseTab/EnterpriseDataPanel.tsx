import React from 'react';
import { HStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { mdiContentSaveEdit } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const EnterpriseDataPanel = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const title = formatMessage({
    id: 'edit-enterprise-data',
    defaultMessage: 'Edit enterprise data',
  });

  return (
    <HStack w='100%' justify='flex-end'>
      {isMobileOnly ? (
        <IconButton
          onClick={() => navigate('/dashboard/enterprise/edit')}
          colorScheme='gray'
          variant='solid'
          title={title}
          icon={<Icon path={mdiContentSaveEdit} />}
        />
      ) : (
        <Button onClick={() => navigate('/dashboard/enterprise/edit')} colorScheme='gray' leftIcon={<Icon path={mdiContentSaveEdit} />}>
          {title}
        </Button>
      )}
    </HStack>
  );
};

export { EnterpriseDataPanel };
