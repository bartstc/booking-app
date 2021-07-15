import { Result, UseCaseError } from 'shared/core';

export namespace GetEmployeeByEmailErrors {
  export class EmployeeDoesNotExistError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `Employee with email ${email} does not exist`,
      });
    }
  }

  export class FacilityNotFoundError extends Result<UseCaseError> {
    constructor(facilityId: string) {
      super(false, {
        message: `Facility with id ${facilityId} does not exist`,
      });
    }
  }
}
