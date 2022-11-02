import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FacilityFixture, renderWithProviders, MetaFixture, EnterpriseFixture } from 'utils';
import { managementMockService } from 'utils/mock';

import { EnterpriseProvider } from 'modules/context/application';
import { IFacilityCollection } from 'modules/facility/application/types';

import { PrivateRoutes } from './PrivateRoutes';

const FACILITY_ID = '1';
const ENTERPRISE_ID = '2';

const facility = FacilityFixture.createPermutation({ facilityId: FACILITY_ID });
const enterprise = EnterpriseFixture.createPermutation({ enterpriseId: ENTERPRISE_ID });

managementMockService.get<IFacilityCollection>(`enterprises/${ENTERPRISE_ID}/facilities`, {
  collection: [facility],
  meta: MetaFixture.toStructure(),
});

it('should redirect from Enterprise page to Facilities page', async function () {
  renderView();

  expect(await screen.findByText('Dashboard'));

  const facilitiesTabLink = await screen.findByTestId('facilities-tab-link');
  await userEvent.click(facilitiesTabLink);

  await screen.findByText('Add facility');
});

const renderView = () =>
  renderWithProviders(
    <EnterpriseProvider value={enterprise}>
      <PrivateRoutes />
    </EnterpriseProvider>,
    {
      route: '/dashboard/enterprise',
    },
  );
