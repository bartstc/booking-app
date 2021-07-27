import { Result, UseCaseError } from 'shared/core';

export namespace GetEmployeesErrors {
  export class EnterpriseNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `enterpriseNotFound`,
      });
    }
  }
}
