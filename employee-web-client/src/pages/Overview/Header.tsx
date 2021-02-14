import React from 'react';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiAccount } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';
import { useLocation } from 'react-router-dom';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { If } from 'shared/If';

const Header = () => {
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();

  const title = formatMessage({
    id: 'add-facility',
    defaultMessage: 'Add facility',
  });

  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='enterprise-heading' defaultMessage='Enterprise' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='enterprise-subheading' defaultMessage='Manage your business' />
        </Text>
      </VStack>
      <If condition={pathname.includes('facilities')}>
        {isMobileOnly ? (
          <IconButton colorScheme='primary' variant='solid' title={title} icon={<Icon path={mdiAccount} color='gray.800' />} />
        ) : (
          <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />}>
            {title}
          </Button>
        )}
      </If>
    </Flex>
  );
};

export { Header };
