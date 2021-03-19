import React from 'react';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

const Header = () => {
  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='enterprise-heading' defaultMessage='Dashboard' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='enterprise-subheading' defaultMessage='Manage your business' />
        </Text>
      </VStack>
    </Flex>
  );
};

export { Header };
