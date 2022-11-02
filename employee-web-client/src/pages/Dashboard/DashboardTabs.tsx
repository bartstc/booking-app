import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { TabList, TabPanel, TabPanels, Tabs as ChakraTabs, useBreakpointValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { TabLink } from 'shared/TabLink';

interface IProps {
  children: ReactNode;
}

const DashboardTabs = ({ children }: IProps) => {
  const { pathname } = useLocation();
  const tabSize = useBreakpointValue({ base: 'sm', md: 'lg' });

  return (
    <ChakraTabs w='100%' size={tabSize}>
      <TabList>
        <TabLink
          isActive={pathname.includes('dashboard/enterprise')}
          to={`/dashboard/enterprise`}
          id='enterprise-tab-link'
          fontWeight='500'
        >
          <FormattedMessage id='enterprise' defaultMessage='Enterprise' />
        </TabLink>
        <TabLink
          isActive={pathname.includes('dashboard/facilities')}
          to={`/dashboard/facilities`}
          id='facilities-tab-link'
          fontWeight='500'
        >
          <FormattedMessage id='facilities' defaultMessage='Facilities' />
        </TabLink>
        <TabLink
          isActive={pathname.includes('dashboard/new-facility')}
          to={'/dashboard/new-facility'}
          id='new-facility-tab-link'
          fontWeight='500'
        >
          <FormattedMessage id='register-facility' defaultMessage='New facility' />
        </TabLink>
      </TabList>
      <TabPanels>
        <TabPanel p={0} pt={6}>
          {children}
        </TabPanel>
      </TabPanels>
    </ChakraTabs>
  );
};

export { DashboardTabs };
