import React from 'react';
import { Flex, Heading, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiAccount } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { AddEmployeeModal } from './AddEmployeeModal';

const Header = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = formatMessage({
    id: 'add-employee',
    defaultMessage: 'Add employee',
  });

  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='employees-heading' defaultMessage='Employees' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='employees-subheading' defaultMessage='Manage your employee list' />
        </Text>
      </VStack>
      <AddEmployeeModal isOpen={isOpen} onClose={onClose} />
      {isMobileOnly ? (
        <IconButton
          colorScheme='primary'
          variant='solid'
          title={title}
          icon={<Icon path={mdiAccount} color='gray.800' />}
          onClick={onOpen}
        />
      ) : (
        <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />} onClick={onOpen}>
          {title}
        </Button>
      )}
    </Flex>
  );
};

export { Header };
