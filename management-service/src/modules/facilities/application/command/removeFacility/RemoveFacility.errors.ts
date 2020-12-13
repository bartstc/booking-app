import { Result, UseCaseError } from 'shared/core';

export namespace RemoveFacilityErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `facilityDoesNotExist`,
      });
    }
  }

  export class EnterpriseNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'enterpriseDoesNotExist',
      });
    }
  }
}
