import { createFixture } from './fixture';
import { ICustomer } from '../../modules/customers/application/types';

export const CustomerFixture = createFixture<ICustomer>({
  customerId: '',
  facilityId: '',
  birthDate: '',
  fullName: 'John DOe',
  description: null,
  isSystemic: false,
  contacts: [],
  address: {
    city: 'NYC',
    street: 'Groove Street',
    postCode: '11-111',
  },
});