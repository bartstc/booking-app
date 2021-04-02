import React from 'react';
import { Badge, Flex } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { FormattedDate } from 'shared/Date';
import { ContactButtons } from 'shared/Contact';

import { ContactType } from 'types';

import { ICustomer } from '../../../application/types';

interface IProps {
  index: number;
  customer: ICustomer;
}

const Row = ({ index, customer }: IProps) => {
  const { formatMessage } = useIntl();

  const phone = customer.contacts.find(contact => contact.type === ContactType.Phone)?.value;
  const address = `${customer.address.city}, ${customer.address.street}`;

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
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>
        <FormattedDate value={customer.birthDate} />
      </TruncatedCell>
      <TruncatedCell justify='flex-end'>
        <ContactButtons contacts={customer.contacts} subject={formatMessage({ id: 'customer', defaultMessage: 'customer' })} />
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };
