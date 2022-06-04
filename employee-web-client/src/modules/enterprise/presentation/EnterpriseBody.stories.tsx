import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EnterpriseBody } from './index';
import { EnterpriseProvider } from '../../context/application';
import { EnterpriseFixture } from '../../../utils/fixtures';

const ENTERPRISE_ID = '1';

const enterprise = EnterpriseFixture.createPermutation({ enterpriseId: ENTERPRISE_ID });

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
