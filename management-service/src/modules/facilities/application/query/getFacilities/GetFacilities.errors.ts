import { Result, UseCaseError } from 'shared/core';

export namespace GetFacilitiesErrors {
  export class EnterpriseNotFoundError extends Result<UseCaseError> {
    constructor(enterpriseId: string) {
      super(false, {
        message: `Enterprise with id ${enterpriseId} does not exist`,
      });
    }
  }
}
