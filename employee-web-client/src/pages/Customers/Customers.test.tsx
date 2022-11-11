import React from 'react';
import { dayjs, muteConsoleBeforeEach } from 'utils';
import { pick } from 'lodash';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { ContactType } from 'types';
import { managementMockService } from 'utils/mock';
import { CustomerFixture, FacilityFixture, MetaFixture, renderWithProviders } from 'utils';
import { IAddCustomerDto, ICustomerCollection } from 'modules/customers/application/types';
import { customersQueryKey } from 'modules/customers/infrastructure/query';
import { FacilityProvider } from 'modules/context/application';

import Customers from './index';

const FACILITY_ID = '1';
const CUSTOMER_ID_1 = '123';
const CUSTOMER_ID_2 = '456';

const facility = FacilityFixture.createPermutation({ facilityId: FACILITY_ID });
const existingCustomer = CustomerFixture.createPermutation({
  facilityId: FACILITY_ID,
  customerId: CUSTOMER_ID_1,
  fullName: 'John Doe',
});
const newCustomer = CustomerFixture.createPermutation({
  facilityId: FACILITY_ID,
  customerId: CUSTOMER_ID_2,
  fullName: 'Sally Doe',
  birthDate: dayjs().format('DD-MM-YYYY'),
  address: {
    city: 'Gdynia',
    street: 'al. Zwycięstwa',
    postCode: '81-500',
  },
  isSystemic: false,
  description: 'lorem ipsum dolor',
  contacts: [
    {
      type: ContactType.Phone,
      value: '+48 555555555',
    },
    {
      type: ContactType.Email,
      value: 'sallydoe@gmail.com',
    },
  ],
});

managementMockService.post<IAddCustomerDto>(
  `facilities/${FACILITY_ID}/customers`,
  pick(newCustomer, ['fullName', 'birthDate', 'address', 'contacts', 'description']) as IAddCustomerDto,
);
managementMockService.get<ICustomerCollection>(customersQueryKey(FACILITY_ID)[0], {
  meta: MetaFixture.createPermutation({ total: 2 }),
  collection: [existingCustomer],
});

muteConsoleBeforeEach();

it(
  'should add new customer to the list',
  async function () {
    renderView();

    await userEvent.click(screen.getByText('Add customer'));

    const form = screen.getByTestId('add-customer-form');
    expect(form).toBeInTheDocument();

    const fullNameInput = screen.getByLabelText(/Full name/);
    const birthDateInput = screen.getByLabelText(/Birth date/);
    const cityInput = screen.getByLabelText(/City/);
    const streetInput = screen.getByLabelText(/Street/);
    const postCodeInput = screen.getByLabelText(/Post code/);
    const descriptionInput = screen.getByLabelText(/Description/);
    // const contactTypeInput = screen.getByLabelText(/Type/);
    const phoneInput = screen.getByLabelText(/Phone/);

    await userEvent.type(fullNameInput, newCustomer.fullName);
    await userEvent.type(birthDateInput, newCustomer.birthDate);
    await userEvent.type(cityInput, newCustomer.address.city);
    await userEvent.type(streetInput, newCustomer.address.street);
    await userEvent.type(postCodeInput, newCustomer.address.postCode);
    await userEvent.type(descriptionInput, newCustomer.description ?? '');
    // await selectEvent.select(contactTypeInput, 'Phone');
    await userEvent.type(phoneInput, newCustomer.contacts[0].value);

    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(form).not.toBeInTheDocument();
      expect(screen.getByText('New customer added successfully')).toBeInTheDocument();
    });
  },
  45 * 1000,
);

const renderView = () =>
  renderWithProviders(
    <FacilityProvider value={facility}>
      <Customers />
    </FacilityProvider>,
    { route: '/customers?offset=0&limit=10' },
  );
