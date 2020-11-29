import { Result, UseCaseError } from 'shared/core';

export namespace GetFacilityErrors {
  export class FacilityDoesNotExistError extends Result<UseCaseError> {
    constructor(facilityId: string) {
      super(false, {
        message: `Facility with id ${facilityId} does not exist`,
      });
    }
  }
}
