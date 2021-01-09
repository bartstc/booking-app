import React from 'react';

import { Grid } from 'shared/Grid';
import { Customer } from 'modules/customers/types';
import { ContactType } from 'types';
import { Pagination } from 'shared/Pagination';

import { Header } from './Header';
import { Row } from './Row';

const mockedCustomer: Customer = {
  customerId: '1',
  facilityId: '2',
  contacts: [
    {
      type: ContactType.Phone,
      value: '+48 555456789',
    },
    {
      type: ContactType.Email,
      value: 'johndoe@gmail.com',
    },
  ],
  address: {
    city: 'New York',
    street: 'Groove Street',
    postCode: '83-340',
    houseNumber: '20',
    flatNumber: null,
  },
  birthDate: 'asd',
  description: null,
  fullName: 'John Doe',
};

const mockedCustomers = Array.from(Array(145).keys()).map(() => mockedCustomer);

const Table = () => {
  return (
    <>
      <Grid itemsCount={mockedCustomers.length} rowGap={1} templateColumns='80px repeat(5, 1fr)' mb={4}>
        <Header />
        {mockedCustomers.map((customer, index) => (
          <Row index={index + 1} key={index} customer={customer} />
        ))}
      </Grid>
      <Pagination limit={10} total={mockedCustomers.length} />
    </>
  );
};

export { Table };
