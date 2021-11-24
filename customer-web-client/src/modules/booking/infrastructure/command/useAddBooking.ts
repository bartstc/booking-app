import { useMutation } from "shared/Suspense";
import { accessibilityHttpService } from "utils/http";
import { Logger, LogLevel } from "utils/logger";

import { IAddBookingDto } from "../../application/types";

export const useAddBooking = () => {
  const { mutateAsync, isLoading } = useMutation<
    void,
    { model: IAddBookingDto; facilityId: string }
  >(({ facilityId, model }) =>
    accessibilityHttpService.post(`facilities/${facilityId}/bookings`, model)
  );

  const handler = (facilityId: string, model: IAddBookingDto) => {
    return mutateAsync({ facilityId, model }).catch((e) => {
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
