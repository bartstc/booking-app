import { useEffect, useState } from 'react';

import { Logger, LogLevel } from 'utils/logger';
import { useRequestStatus } from 'hooks';
import { RequestStatus } from 'types';
import { useFacilityConsumer } from 'modules/context';

import { ICustomer } from '../../application/types';
import { customerQuery } from './customerQuery';

export const useFetchCustomer = (customerId: string) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const { status, setStatus } = useRequestStatus();

  const { facilityId } = useFacilityConsumer();

  useEffect(() => {
    const fetchCustomer = async () => {
      setStatus(RequestStatus.InProgress);
      try {
        const customer = await customerQuery(facilityId, customerId);
        setCustomer(customer);
        setStatus(RequestStatus.Done);
      } catch (e) {
        setStatus(RequestStatus.Failure);
        Logger.log({
          name: e.name,
          message: JSON.stringify(e),
          level: LogLevel.Error,
        });
        throw e;
      }
    };
    fetchCustomer();
  }, [setStatus, setCustomer, facilityId, customerId]);

  return [customer, status === RequestStatus.InProgress] as const;
};
