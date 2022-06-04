import { createFixture } from './fixture';
import { IEnterprise } from '../../modules/enterprise/application/types';

export const EnterpriseFixture = createFixture<IEnterprise>({
  enterpriseId: '1',
  ownerId: '2',
  enterpriseName: 'Hardcut Barber',
  enterpriseDescription: 'Lorem ipsum dolor',
  enterpriseUrl: 'hardcut.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  contactPerson: {
    email: 'hardcut@test.com',
    phone: '+48 555555555',
    name: 'John Doe',
  },
});
