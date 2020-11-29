import { Result, UseCaseError } from 'shared/core';

export namespace GetEnterpriseErrors {
  export class EnterpriseDoesNotExistError extends Result<UseCaseError> {
    constructor(enterpriseId: string) {
      super(false, {
        message: `Enterprise with id ${enterpriseId} does not exist`,
      });
    }
  }
}
