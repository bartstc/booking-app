import React from 'react';
import { Flex, Heading, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiAccount } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { AddCustomerModal } from '../components/AddCustomerModal';

const Header = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = formatMessage({
    id: 'add-customer',
    defaultMessage: 'Add customer',
  });

  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='customers-heading' defaultMessage='Customers' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='customers-subheading' defaultMessage='Manage your customer list' />
        </Text>
      </VStack>
      <AddCustomerModal isOpen={isOpen} onClose={onClose} />
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
