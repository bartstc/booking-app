import { Result, UseCaseError } from 'shared/core';

export namespace ActivateEmployeeErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `facilityDoesNotExist`,
      });
    }
  }

  export class EmployeeNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `employeeDoesNotExist`,
      });
    }
  }
}
