import React from 'react';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiBook } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Header = () => {
  const { formatMessage } = useIntl();

  const title = formatMessage({
    id: 'add-offer',
    defaultMessage: 'Add offer',
  });

  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='offers-heading' defaultMessage='Offers' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='offers-subheading' defaultMessage='Manage your offer list' />
        </Text>
      </VStack>
      {isMobileOnly ? (
        <IconButton colorScheme='primary' variant='solid' title={title} icon={<Icon path={mdiBook} color='gray.800' />} />
      ) : (
        <Button colorScheme='primary' leftIcon={<Icon path={mdiBook} />}>
          {title}
        </Button>
      )}
    </Flex>
  );
};

export { Header };
