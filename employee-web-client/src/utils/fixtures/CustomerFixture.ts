import { createFixture } from './fixture';
import { ICustomer } from '../../modules/customers/application/types';
import { dayjs } from '../dayjs';

export const CustomerFixture = createFixture<ICustomer>({
  customerId: '',
  facilityId: '',
  birthDate: dayjs().format(),
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
