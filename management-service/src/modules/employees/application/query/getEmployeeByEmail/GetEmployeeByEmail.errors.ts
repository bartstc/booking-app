import { Result, UseCaseError } from 'shared/core';

export namespace GetEmployeeByEmailErrors {
  export class EmployeeDoesNotExistError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `Employee with email ${email} does not exist`,
      });
    }
  }
}
