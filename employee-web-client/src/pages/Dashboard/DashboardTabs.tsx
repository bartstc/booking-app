import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { TabList, TabPanel, TabPanels, Tabs as ChakraTabs, useBreakpointValue } from '@chakra-ui/react';
import { useLocation } from "react-router-dom";

import { TabLink } from 'shared/TabLink';
import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';

interface IProps {
  children: ReactNode;
}

const DashboardTabs = ({ children }: IProps) => {
  const { pathname } = useLocation();
  const tabSize = useBreakpointValue({ base: 'sm', md: 'lg' });

  return (
    <ChakraTabs w='100%' size={tabSize}>
      <TabList>
        <TabLink isActive={pathname.includes('dashboard/enterprise')} to={`/dashboard/enterprise`} fontWeight='500'>
          <FormattedMessage id='enterprise' defaultMessage='Enterprise' />
        </TabLink>
        <TabLink isActive={pathname.includes('dashboard/facilities')} to={buildUrl(`/dashboard/facilities`, DEFAULT_PARAMS)} fontWeight='500'>
          <FormattedMessage id='facilities' defaultMessage='Facilities' />
        </TabLink>
        <TabLink isActive={pathname.includes('dashboard/new-facility')} to={'/dashboard/new-facility'} fontWeight='500'>
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
