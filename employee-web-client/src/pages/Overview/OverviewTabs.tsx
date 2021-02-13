import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { TabList, TabPanel, TabPanels, Tabs as ChakraTabs, useBreakpointValue } from '@chakra-ui/react';

import { TabLink } from 'shared/TabLink';
import { buildUrl } from '../../utils';
import { DEFAULT_PARAMS } from '../../utils/constant';

interface IProps {
  children: ReactNode;
}

const OverviewTabs = ({ children }: IProps) => {
  const tabSize = useBreakpointValue({ base: 'sm', md: 'lg' });

  return (
    <ChakraTabs w='100%' size={tabSize}>
      <TabList>
        <TabLink to={`/overview/enterprise`} fontWeight='700'>
          <FormattedMessage id='enterprise-overview' defaultMessage='Enterprise' />
        </TabLink>
        <TabLink to={buildUrl(`/overview/facilities`, DEFAULT_PARAMS)} fontWeight='700'>
          <FormattedMessage id='facilities-overview' defaultMessage='Facilities' />
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

export { OverviewTabs };
