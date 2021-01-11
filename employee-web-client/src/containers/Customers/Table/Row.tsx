import React from 'react';
import { Badge, Flex } from '@chakra-ui/react';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { Customer } from 'modules/customers/types';
import { ContactType } from 'types';

import { ActionButtons } from '../ActionButtons';

interface IProps {
  index: number;
  customer: Customer;
}

const Row = ({ index, customer }: IProps) => {
  const phone = customer.contacts.find(contact => contact.type === ContactType.Phone)?.value;
  const email = customer.contacts.find(contact => contact.type === ContactType.Email)?.value;
  const url = customer.contacts.find(contact => contact.type === ContactType.Url)?.value;
  const address = `${customer.address.city}, ${customer.address.street} ${customer.address.houseNumber}`;

  return (
    <GridItem>
      <TruncatedCell>{index}</TruncatedCell>
      <TruncatedCell>{customer.fullName}</TruncatedCell>
      <Flex display={{ base: 'none', md: 'lex' }} className='cell'>
        <Badge variant='solid' colorScheme='gray'>
          0 pending
        </Badge>
      </Flex>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>{address ?? '---'}</TruncatedCell>
      <TruncatedCell>{phone}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>{email ?? '---'}</TruncatedCell>
      <TruncatedCell justify='flex-end'>
        <ActionButtons phone={phone} email={email} url={url} />
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };
