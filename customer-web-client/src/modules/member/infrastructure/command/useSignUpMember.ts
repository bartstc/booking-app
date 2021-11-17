import { communityHttpService } from "utils/http";
import { Logger, LogLevel } from "utils/logger";
import { useMutation } from "shared/Suspense";

import { ISignUpMemberDto } from "../../application/types";

export const useSignUpMember = () => {
  const { mutateAsync, isLoading } = useMutation<
    { employeeId: string },
    ISignUpMemberDto
  >((model) => communityHttpService.post(`Members`, model));

  const handler = (model: ISignUpMemberDto) => {
    return mutateAsync(model).catch((e) => {
      // todo
      // if (e.response.message === "emailInUse") {
      //   throw new EmailAlreadyExistsError();
      // }

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

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email already in use");
  }
}
