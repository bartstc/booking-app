import { Result, UseCaseError } from 'shared/core';

export namespace CreateOwnerEmployeeErrors {
  export class EmployeeEmailAlreadyInUseError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `emailInUse`,
      });
    }
  }

  export class EnterpriseNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `enterpriseNotFound`,
      });
    }
  }
}
