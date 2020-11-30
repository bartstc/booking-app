import { Result, UseCaseError } from 'shared/core';

export namespace GetEmployeeErrors {
  export class EmployeeDoesNotExistError extends Result<UseCaseError> {
    constructor(employeeId: string) {
      super(false, {
        message: `Employee with id ${employeeId} does not exist`,
      });
    }
  }
}
