import React from 'react';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { mdiAccount } from '@mdi/js';

import { Button } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Header = () => {
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
      <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />}>
        <FormattedMessage id='add-customer' defaultMessage='Add customer' />
      </Button>
    </Flex>
  );
};

export { Header };
