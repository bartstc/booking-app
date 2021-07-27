import { Result, UseCaseError } from 'shared/core';

export namespace GetEnterpriseByOwnerIdErrors {
  export class EnterpriseDoesNotExistError extends Result<UseCaseError> {
    constructor(ownerId: string) {
      super(false, {
        message: `Enterprise with owner id ${ownerId} does not exist`,
      });
    }
  }
}
