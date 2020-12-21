import { Result, UseCaseError } from 'shared/core';

export namespace GetCustomerErrors {
  export class CustomerDoesNotExistError extends Result<UseCaseError> {
    constructor(customerId: string) {
      super(false, {
        message: `Customer with id ${customerId} does not exist`,
      });
    }
  }

  export class FacilityDoesNotExistError extends Result<UseCaseError> {
    constructor(facilityId: string) {
      super(false, {
        message: `Facility with id ${facilityId} does not exist`,
      });
    }
  }
}
