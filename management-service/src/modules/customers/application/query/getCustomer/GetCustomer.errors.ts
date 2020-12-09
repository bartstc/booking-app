import { Result, UseCaseError } from 'shared/core';

export namespace GetCustomerErrors {
  export class CustomerDoesNotExistError extends Result<UseCaseError> {
    constructor(customerId: string) {
      super(false, {
        message: `Customer with id ${customerId} does not exist`,
      });
    }
  }
}
