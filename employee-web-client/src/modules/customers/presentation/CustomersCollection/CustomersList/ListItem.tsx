import React from 'react';
import { VStack, HStack, Heading, Text, Avatar, Tag, TagLabel, useColorModeValue } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { ContactType } from 'types';
import { ContactButtons } from 'shared/Contact';

import { ICustomer } from '../../../application/types';

interface IProps {
  customer: ICustomer;
}

const ListItem = ({ customer: { address, fullName, contacts } }: IProps) => {
  const { formatMessage } = useIntl();
  const background = useColorModeValue('gray.50', 'gray.700');

  const phone = contacts.find(contact => contact.type === ContactType.Phone)?.value;
  const email = contacts.find(contact => contact.type === ContactType.Email)?.value;

  return (
    <HStack spacing={3} justify='space-between' align='start' w='100%' mb={2} p='10px' borderRadius={8} backgroundColor={background}>
      <HStack align='start' spacing={3}>
        <Avatar name={fullName} size='sm' />
        <VStack align='flex-start' spacing='10px'>
          <VStack align='flex-start' spacing={0}>
            <Heading
              lineHeight={{ base: '1.15rem', md: '1.3rem' }}
              as='h5'
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight='700'
              isTruncated
              width='100%'
            >
              {fullName}
            </Heading>
            <Text as='span' isTruncated fontSize='xs' width='100%'>
              {address.city}, {address.street}
            </Text>
          </VStack>
          <HStack>
            {phone && (
              <Tag variant='subtle' colorScheme='primary' size='sm'>
                <TagLabel isTruncated width='100%'>
                  {phone}
                </TagLabel>
              </Tag>
            )}
            {!phone && email && (
              <Tag variant='subtle' colorScheme='primary' size='sm'>
                <TagLabel isTruncated width='100%'>
                  {email}
                </TagLabel>
              </Tag>
            )}
          </HStack>
        </VStack>
      </HStack>
      <ContactButtons contacts={contacts} subject={formatMessage({ id: 'customer', defaultMessage: 'customer' })} />
    </HStack>
  );
};

export { ListItem };
