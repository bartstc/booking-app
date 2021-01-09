import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { VStack, Flex, Heading, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { mdiAccount, mdiFilter, mdiMagnify } from '@mdi/js';
import { Table } from './Table';
import { useQueryParams } from '../../shared/Params';

const Customers = () => {
  const { formatMessage } = useIntl();
  const { resetPagination, add } = useQueryParams();

  return (
    <VStack spacing={16} w='100%' mt={{ base: 4, md: 10 }} px={{ base: 4, md: 8 }} maxW='1280px' margin='0 auto'>
      <Flex w='100%' justify='space-between'>
        <VStack as='header' align='flex-start'>
          <Heading as='h1' lineHeight={8} fontWeight='900'>
            <FormattedMessage id='customers-heading' defaultMessage='Customers' />
          </Heading>
          <Text as='h2' lineHeight={4}>
            <FormattedMessage id='customers-subheading' defaultMessage='Manage your customer list' />
          </Text>
        </VStack>
        <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />} onClick={() => add('test', 'test')}>
          <FormattedMessage id='add-customer' defaultMessage='Add customer' />
        </Button>
      </Flex>
      <VStack w='100%' maxW='1080px'>
        <Flex justify='space-between' w='100%' mb={4}>
          <InputGroup maxW='350px'>
            <InputLeftElement pointerEvents='none'>
              <div>
                <Icon path={mdiMagnify} color='gray.500' size='26px' />
              </div>
            </InputLeftElement>
            <Input
              placeholder={`${formatMessage({
                id: 'search-customer-name',
                defaultMessage: `Type customer's name`,
              })}...`}
            />
          </InputGroup>
          <Button colorScheme='gray' leftIcon={<Icon path={mdiFilter} />} onClick={() => resetPagination('test3')}>
            <FormattedMessage id='filters' defaultMessage='Filters' />
          </Button>
        </Flex>
        <Table />
      </VStack>
    </VStack>
  );
};

export default Customers;
