import React, { ReactNode } from 'react';

import { getEnterprises, getEnterprisesKey } from 'modules/enterprise/api';
import { getFacilities, getFacilitiesKey } from 'modules/facility/api';
import { IEnterprise } from 'modules/enterprise/types';
import { IFacility } from 'modules/facility/types';

import { FetchBoundary } from '../Suspense';
import { createSharedData } from '../Share';

export const { useShareConsumer: useEnterpriseConsumer, ShareProvider: EnterpriseProvider } = createSharedData<IEnterprise>();
export const { useShareConsumer: useFacilityConsumer, ShareProvider: FacilityProvider } = createSharedData<IFacility>();

interface IProps {
  children: (enterprise: IEnterprise | null, facility: IFacility | null) => ReactNode;
}

const Context = ({ children }: IProps) => {
  return (
    <FetchBoundary queryKey={getEnterprisesKey()} queryFn={() => getEnterprises()} errorFallback={() => <>{children(null, null)}</>}>
      {({ data: enterpriseData }) => (
        <EnterpriseProvider data={enterpriseData[0]}>
          <FetchBoundary
            queryKey={getFacilitiesKey(enterpriseData[0]?.enterpriseId)}
            queryFn={() => getFacilities(enterpriseData[0]?.enterpriseId)}
            errorFallback={() => <>{children(enterpriseData[0], null)}</>}
          >
            {({ data: facilityData }) => (
              <FacilityProvider data={facilityData.collection[0]}>
                {children(enterpriseData[0], facilityData.collection[0])}
              </FacilityProvider>
            )}
          </FetchBoundary>
          {children}
        </EnterpriseProvider>
      )}
    </FetchBoundary>
  );
};

export { Context };
