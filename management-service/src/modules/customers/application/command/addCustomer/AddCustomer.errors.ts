import { Result, UseCaseError } from 'shared/core';

export namespace AddCustomerErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `facilityDoesNotExist`,
      });
    }
  }
}
