import { Result, UseCaseError } from 'shared/core';

export namespace AddEmployeeErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `facilityDoesNotExist`,
      });
    }
  }

  export class EmployeeEmailAlreadyInUseError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `emailInUse`,
      });
    }
  }
}
