import { Result, UseCaseError } from 'shared/core';

export namespace RemoveEmployeeErrors {
  export class EmployeeNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `employeeDoesNotExist`,
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
