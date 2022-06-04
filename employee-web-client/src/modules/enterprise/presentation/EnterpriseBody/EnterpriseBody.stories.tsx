import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { faker } from '@faker-js/faker';

import { EnterpriseBody } from './index';
import { IEnterprise } from '../../application/types';
import { enterpriseQueryKey } from '../../infrastructure/query';
import { EnterpriseProvider } from '../../../context/application';
import { managementMockService } from '../../../../utils';

const ENTERPRISE_ID = '1';

const enterprise: IEnterprise = {
  enterpriseId: ENTERPRISE_ID,
  enterpriseName: 'Hardcut Barber',
  enterpriseDescription: faker.random.words(10),
  enterpriseUrl: 'hardcut.com',
  createdAt: new Date(),
  ownerId: '2',
  updatedAt: new Date(),
  contactPerson: {
    email: 'hardcut@test.com',
    phone: '+48 555555555',
    name: 'John Doe',
  },
};

managementMockService.get<IEnterprise>(enterpriseQueryKey(ENTERPRISE_ID)[0], enterprise);

export default {
  title: 'example/enterprise/EnterpriseBody',
  component: EnterpriseBody,
} as ComponentMeta<typeof EnterpriseBody>;

const Template: ComponentStory<typeof EnterpriseBody> = () => {
  return (
    <EnterpriseProvider value={enterprise}>
      <EnterpriseBody />
    </EnterpriseProvider>
  );
};

export const Test = Template.bind({});
