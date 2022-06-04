import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EnterpriseBody } from './index';
import { IEnterprise } from '../application/types';
import { EnterpriseProvider } from '../../context/application';

const ENTERPRISE_ID = '1';

const enterprise: IEnterprise = {
  enterpriseId: ENTERPRISE_ID,
  enterpriseName: 'Hardcut Barber',
  enterpriseDescription: 'asdasd',
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

export default {
  title: 'modules/enterprise/EnterpriseBody',
  component: EnterpriseBody,
} as ComponentMeta<typeof EnterpriseBody>;

const Template: ComponentStory<typeof EnterpriseBody> = () => {
  return (
    <EnterpriseProvider value={enterprise}>
      <EnterpriseBody />
    </EnterpriseProvider>
  );
};

export const Default = Template.bind({});
