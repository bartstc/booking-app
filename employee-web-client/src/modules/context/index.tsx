import React, { ReactNode, Suspense, useEffect, useState } from 'react';

import {
  enterpriseByOwnerIdQuery,
  enterpriseByOwnerIdQueryKey,
  enterpriseQuery,
  enterpriseQueryKey,
  useEnterpriseQuery,
} from 'modules/enterprise/infrastructure/query';
import { useFacilityByIdQuery } from 'modules/facility/infrastructure/query';

import { Spinner } from 'shared/Spinner';

import { useAuthContextSelector } from '../auth/application';
import { useEmployeeByEmailQuery, useEmployeeQuery } from '../employees/infrastructure/query';
import { ErrorBoundary } from '../../shared/ErrorBoundary';
import {
  EmployeeProvider,
  useEmployeeContextSelector,
  FacilityProvider,
  useFacilityContextSelector,
  EnterpriseProvider,
  useEnterpriseContextSelector,
} from './application';
import { CreateEnterprise, CreateEmployee, CreateFacility } from './presentation';
import { useSuspense } from '../../shared/Suspense';

interface IProps {
  children: ReactNode;
}

const Context = ({ children }: IProps) => {
  const getUser = useAuthContextSelector(state => state.getUser);
  const parseJwt = useAuthContextSelector(state => state.parseJwt);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // todo: cleanup
  useEffect(() => {
    getUser().then(res => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = parseJwt(res!.id_token);
      setEmail(decoded.email);
      setUserId(decoded.sub.split('|')[1]);
    });
  }, []);

  if (!email && !userId) {
    return <Spinner margin={32} mt={10} />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner margin={32} mt={10} />}>
        <Content email={email!} userId={userId!}>
          {children}
        </Content>
      </Suspense>
    </ErrorBoundary>
  );
};

const Content = ({ email, userId, children }: { email: string; userId: string; children: ReactNode }) => {
  const employee = useEmployeeByEmailQuery(email);
  const { data: enterprise } = useSuspense(employee ? enterpriseQueryKey(employee.enterpriseId) : enterpriseByOwnerIdQueryKey(userId), () =>
    employee ? enterpriseQuery(employee.enterpriseId) : enterpriseByOwnerIdQuery(userId),
  );

  if (!enterprise) {
    return <CreateEnterprise ownerId={userId} />;
  }

  if (!employee) {
    return <CreateEmployee enterpriseId={enterprise.enterpriseId} ownerEmail={email} />;
  }

  if (employee.scope.facilityIds.length === 0) {
    return <CreateFacility enterpriseId={enterprise.enterpriseId} employeeId={employee.employeeId} employeeEmail={email} />;
  }

  return (
    <Providers enterpriseId={enterprise.enterpriseId} employeeId={employee.employeeId}>
      {children}
    </Providers>
  );
};

interface IProvidersProps {
  enterpriseId: string;
  employeeId: string;
  children: ReactNode;
}

const Providers = ({ employeeId, enterpriseId, children }: IProvidersProps) => {
  const employee = useEmployeeQuery(enterpriseId, employeeId);
  const enterprise = useEnterpriseQuery(employee.enterpriseId);
  const facility = useFacilityByIdQuery(employee.scope.activeFacilityId ?? employee.scope.facilityIds[0]);

  return (
    <EmployeeProvider value={employee}>
      <EnterpriseProvider value={enterprise}>
        <FacilityProvider value={facility}>{children}</FacilityProvider>
      </EnterpriseProvider>
    </EmployeeProvider>
  );
};

export { Context, useFacilityContextSelector, useEmployeeContextSelector, useEnterpriseContextSelector };
