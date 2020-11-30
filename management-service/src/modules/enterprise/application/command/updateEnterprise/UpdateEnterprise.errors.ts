import { Result, UseCaseError } from 'shared/core';

export namespace UpdateEnterpriseErrors {
  export class EnterpriseNotFoundError extends Result<UseCaseError> {
    constructor(enterpriseId: string) {
      super(false, { message: `Enterprise with id ${enterpriseId} not found` });
    }
  }
}
