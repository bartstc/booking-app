import React, { ReactNode } from 'react';

import { getEnterprises, getEnterprisesKey } from 'modules/enterprise/infrastructure/query';
import { getFacilities, getFacilitiesKey } from 'modules/facility/infrastructure/query';
import { IEnterprise } from 'modules/enterprise/types';
import { IFacility } from 'modules/facility/types';

import { createSharedData } from 'shared/Share';
import { FetchBoundary } from 'shared/Suspense';

const { useShareConsumer: useEnterpriseConsumer, ShareProvider: EnterpriseProvider } = createSharedData<IEnterprise>();
const { useShareConsumer: useFacilityConsumer, ShareProvider: FacilityProvider } = createSharedData<IFacility>();

export { useEnterpriseConsumer };
export { useFacilityConsumer };

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
