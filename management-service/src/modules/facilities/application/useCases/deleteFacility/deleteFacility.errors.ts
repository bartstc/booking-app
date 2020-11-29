import { Result, UseCaseError } from 'shared/core';

export namespace DeleteFacilityErrors {
  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `facilityDoesNotExist`,
      });
    }
  }
}
