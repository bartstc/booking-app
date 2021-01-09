import React from 'react';
import { Badge } from '@chakra-ui/react';

import { GridItem } from 'shared/Grid';
import { Customer } from 'modules/customers/types';
import { ContactType } from 'types';

interface IProps {
  index: number;
  customer: Customer;
}

const Row = ({ index, customer }: IProps) => {
  const phone = customer.contacts.find(contact => contact.type === ContactType.Phone)?.value ?? '---';
  const email = customer.contacts.find(contact => contact.type === ContactType.Email)?.value ?? '---';

  return (
    <GridItem>
      <div className='cell'>{index}</div>
      <div className='cell'>{customer.fullName}</div>
      <div className='cell'>
        <Badge variant='solid' colorScheme='gray'>
          0 pending
        </Badge>
      </div>
      <div className='cell'>{phone}</div>
      <div className='cell'>{email}</div>
      <div className='cell'>{''}</div>
    </GridItem>
  );
};

export { Row };
