import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { VStack, Flex, Heading, Text, HStack } from '@chakra-ui/react';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { mdiAccount, mdiFilter } from '@mdi/js';
import { Table } from './Table';
import { FiltersInput, ClearFiltersIconButton } from '../../shared/Filters';

const Customers = () => {
  const { formatMessage } = useIntl();

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
        <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />}>
          <FormattedMessage id='add-customer' defaultMessage='Add customer' />
        </Button>
      </Flex>
      <VStack w='100%' maxW='1080px'>
        <Flex justify='space-between' w='100%' mb={4}>
          <FiltersInput
            filterName='customerName'
            placeholder={`${formatMessage({
              id: 'search-customer-name',
              defaultMessage: `Type customer's name`,
            })}...`}
          />
          <HStack>
            <ClearFiltersIconButton />
            <Button colorScheme='gray' leftIcon={<Icon path={mdiFilter} />}>
              <FormattedMessage id='filters' defaultMessage='Filters' />
            </Button>
          </HStack>
        </Flex>
        <Table />
      </VStack>
    </VStack>
  );
};

export default Customers;
