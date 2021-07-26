import { Result, UseCaseError } from 'shared/core';

export namespace CreateFacilityErrors {
  export class SlugAlreadyExistsError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `slugAlreadyExists`,
      });
    }
  }

  export class EnterpriseDoesNotExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'enterpriseDoesNotExist',
      });
    }
  }

  export class CreatorDoesNotExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `creatorDoesNotExist`,
      });
    }
  }
}
