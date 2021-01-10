import React from 'react';
import { VStack, HStack, Heading, Text, Avatar, Tag, TagLabel, useColorModeValue } from '@chakra-ui/react';

import { Customer } from 'modules/customers/types';
import { ContactType } from 'types';
import { ActionButtons } from './ActionButtons';

interface IProps {
  customer: Customer;
}

const ListItem = ({ customer: { address, fullName, contacts } }: IProps) => {
  const background = useColorModeValue('gray.50', 'gray.700');

  const phone = contacts.find(contact => contact.type === ContactType.Phone)?.value;
  const email = contacts.find(contact => contact.type === ContactType.Email)?.value;
  const url = contacts.find(contact => contact.type === ContactType.Url)?.value;

  return (
    <HStack spacing={3} justify='space-between' align='start' w='100%' mb={2} p='10px' borderRadius={8} backgroundColor={background}>
      <HStack align='start' spacing={3}>
        <Avatar name={fullName} size='sm' />
        <VStack align='flex-start' spacing='10px'>
          <VStack align='flex-start' spacing={0}>
            <Heading
              lineHeight={{ base: '14px', md: '18px' }}
              as='h5'
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight='700'
              isTruncated
              width='100%'
            >
              {fullName}
            </Heading>
            <Text as='span' isTruncated fontSize='xs' width='100%'>
              {address.city}, {address.street} {address.houseNumber}
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
      <ActionButtons phone={phone} email={email} url={url} />
    </HStack>
  );
};

export { ListItem };
