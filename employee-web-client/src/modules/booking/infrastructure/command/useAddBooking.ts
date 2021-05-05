import { useMutation } from 'shared/Suspense';
import { accessibilityHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { IAddBookingDto } from '../../application/types';

export const useAddBooking = (facilityId: string) => {
  const { mutateAsync, isLoading } = useMutation<void, IAddBookingDto>(model =>
    accessibilityHttpService.post(`facilities/${facilityId}/bookings`, model),
  );

  const handler = (model: IAddBookingDto) => {
    return mutateAsync(model).catch(e => {
      Logger.log({
        name: e.name,
        message: JSON.stringify(e),
        level: LogLevel.Error,
      });
      throw e;
    });
  };

  return [handler, isLoading] as const;
};
