import { Result, UseCaseError } from 'shared/core';

export namespace AddEmployeeErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `facilityDoesNotExist`,
      });
    }
  }
}
