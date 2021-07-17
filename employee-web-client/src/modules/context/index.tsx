import React, { ReactNode, Suspense, useEffect, useState } from 'react';

import { useEnterpriseQuery } from 'modules/enterprise/infrastructure/query';
import { useFacilityByIdQuery } from 'modules/facility/infrastructure/query';

import { Spinner } from 'shared/Spinner';

import { useAuthContextSelector } from '../auth/application';
import { useEmployeeByEmailQuery } from '../employees/infrastructure/query';
import { ErrorBoundary } from '../../shared/ErrorBoundary';
import { EmployeeProvider, useEmployeeContextSelector } from './EmployeeProvider';
import { FacilityProvider, useFacilityContextSelector } from './FacilityProvider';
import { EnterpriseProvider, useEnterpriseContextSelector } from './EnterpriseProvider';

interface IProps {
  children: ReactNode;
}

const Context = ({ children }: IProps) => {
  const getUser = useAuthContextSelector(state => state.getUser);
  const parseJwt = useAuthContextSelector(state => state.parseJwt);
  const [email, setEmail] = useState<string | null>(null);

  // todo: handle properly
  useEffect(() => {
    getUser().then(res => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = parseJwt(res!.id_token);
      setEmail(decoded.email);
    });
  }, []);

  if (!email) {
    return <Spinner margin={32} mt={10} />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner margin={32} mt={10} />}>
        <Content email={email}>{children}</Content>
      </Suspense>
    </ErrorBoundary>
  );
};

const Content = ({ email, children }: { email: string; children: ReactNode }) => {
  const employee = useEmployeeByEmailQuery(email);
  const facility = useFacilityByIdQuery(employee.facilityId);
  const enterprise = useEnterpriseQuery(facility.enterpriseId);

  return (
    <EmployeeProvider value={employee}>
      <EnterpriseProvider value={enterprise}>
        <FacilityProvider value={facility}>{children}</FacilityProvider>
      </EnterpriseProvider>
    </EmployeeProvider>
  );
};

export { Context, useFacilityContextSelector, useEmployeeContextSelector, useEnterpriseContextSelector };
