import { useMemo, useState } from 'react';
import { RequestStatus } from '../types';

export const useRequestStatus = () => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Init);
  return useMemo(() => [status, setStatus] as const, [status]);
};
