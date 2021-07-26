import { Result, UseCaseError } from 'shared/core';

export namespace ChangeActiveFacilityErrors {
  export class EmployeeNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `employeeDoesNotExist`,
      });
    }
  }
}
