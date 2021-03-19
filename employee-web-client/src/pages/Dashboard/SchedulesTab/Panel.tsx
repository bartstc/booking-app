import React from 'react';
import { useIntl } from 'react-intl';
import { Flex } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiFile } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

interface IProps {
  showModal: () => void;
}

const Panel = ({ showModal }: IProps) => {
  const { formatMessage } = useIntl();

  const title = formatMessage({
    id: 'add-schedule',
    defaultMessage: 'Add schedule',
  });

  return (
    <Flex justify='flex-end' w='100%' mb={{ base: 2, md: 4 }}>
      {isMobileOnly ? (
        <IconButton
          onClick={() => showModal()}
          ml={2}
          colorScheme='primary'
          variant='solid'
          title={title}
          icon={<Icon path={mdiFile} color='gray.800' />}
        />
      ) : (
        <Button onClick={() => showModal()} colorScheme='primary' leftIcon={<Icon path={mdiFile} />}>
          {title}
        </Button>
      )}
    </Flex>
  );
};

export { Panel };
