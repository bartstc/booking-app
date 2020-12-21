import { Result, UseCaseError } from 'shared/core';

export namespace GetEmployeeErrors {
  export class EmployeeDoesNotExistError extends Result<UseCaseError> {
    constructor(employeeId: string) {
      super(false, {
        message: `Employee with id ${employeeId} does not exist`,
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
