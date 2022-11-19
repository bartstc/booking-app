import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within, userEvent, waitForElementToBeRemoved, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { dayjs } from 'utils/dayjs';
import { pick } from 'lodash';

import { withParams } from 'utils/storybook';
import { managementMockService } from 'utils/mock';
import { FacilityFixture, generateID, MetaFixture, CustomerFixture } from 'utils';

import { ContactType } from 'types';
import { IAddCustomerDto, ICustomerCollection } from 'modules/customers/application/types';
import { customersQueryKey } from 'modules/customers/infrastructure/query';
import { FacilityProvider } from 'modules/context/application';

import Customers from './index';

const FACILITY_ID = generateID();
const CUSTOMER_ID_1 = generateID();
const CUSTOMER_ID_2 = generateID();
const CUSTOMER_ID_3 = generateID();

const facility = FacilityFixture.createPermutation({ facilityId: FACILITY_ID });
const existingCustomer1 = CustomerFixture.createPermutation({
  customerId: CUSTOMER_ID_1,
  facilityId: FACILITY_ID,
  fullName: 'John Doe',
});
const existingCustomer2 = CustomerFixture.createPermutation({
  customerId: CUSTOMER_ID_2,
  facilityId: FACILITY_ID,
  fullName: 'Jane Doe',
});
const newCustomer = CustomerFixture.createPermutation({
  customerId: CUSTOMER_ID_3,
  facilityId: FACILITY_ID,
  fullName: 'Sally Doe',
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

const customersList = [existingCustomer1, existingCustomer2];

managementMockService.post<IAddCustomerDto>(`facilities/${FACILITY_ID}/customers`, (req, res, ctx) => {
  customersList.push(newCustomer);

  return res(
    ctx.status(200),
    ctx.json(pick(newCustomer, ['fullName', 'birthDate', 'address', 'contacts', 'description']) as IAddCustomerDto),
  );
});

export default {
  title: 'pages/CustomersPage',
  component: Customers,
  decorators: [withParams()],
  parameters: {
    reactRouter: {
      routePath: '/customers',
      searchParams: { limit: 10, offset: 0 },
    },
  },
} as ComponentMeta<typeof Customers>;

const Template: ComponentStory<typeof Customers> = () => {
  return (
    <FacilityProvider value={facility}>
      <Customers />
    </FacilityProvider>
  );
};

export const CustomersList = Template.bind({});
CustomersList.decorators = [
  Story => {
    managementMockService.get<ICustomerCollection>(customersQueryKey(FACILITY_ID)[0], {
      meta: MetaFixture.createPermutation({ total: 2 }),
      collection: customersList,
    });

    return <Story />;
  },
];

export const AddNewCustomer = Template.bind({});
AddNewCustomer.decorators = CustomersList.decorators;
AddNewCustomer.play = async ({ canvasElement }) => {
  within(canvasElement);

  await waitForElementToBeRemoved(screen.queryByTestId('table-loader'));

  await userEvent.click(screen.getByText('Add customer'));

  const form = screen.getByTestId('add-customer-form');
  await expect(form).toBeInTheDocument();

  const fullNameInput = screen.getByLabelText(/Full name/);
  const birthDateInput = screen.getByLabelText(/Birth date/);
  const cityInput = screen.getByLabelText(/City/);
  const streetInput = screen.getByLabelText(/Street/);
  const postCodeInput = screen.getByLabelText(/Post code/);
  const descriptionInput = screen.getByLabelText(/Description/);
  const phoneInput = screen.getByLabelText(/Phone/);

  await userEvent.type(fullNameInput, newCustomer.fullName);
  await userEvent.type(birthDateInput, dayjs(newCustomer.birthDate).format('DD-MM-YYYY'));
  await userEvent.type(cityInput, newCustomer.address.city);
  await userEvent.type(streetInput, newCustomer.address.street);
  await userEvent.type(postCodeInput, newCustomer.address.postCode);
  await userEvent.type(descriptionInput, newCustomer.description ?? '');
  await userEvent.type(phoneInput, newCustomer.contacts[0].value);

  await userEvent.click(screen.getByText('Submit'));

  await waitForElementToBeRemoved(form);

  await expect(screen.getByText('New customer added successfully')).toBeInTheDocument();
  await expect(screen.getAllByText('Sally Doe').length).toBeGreaterThan(0);
};

export const EmptyCustomersList = Template.bind({});
EmptyCustomersList.decorators = [
  Story => {
    managementMockService.get<ICustomerCollection>(customersQueryKey(FACILITY_ID)[0], {
      meta: MetaFixture.createPermutation({ total: 0 }),
      collection: [],
    });

    return <Story />;
  },
];
