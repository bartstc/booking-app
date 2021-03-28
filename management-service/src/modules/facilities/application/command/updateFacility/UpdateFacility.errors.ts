import { Result, UseCaseError } from 'shared/core';

export namespace UpdateFacilityErrors {
  export class FacilityDoesNotExist extends Result<UseCaseError> {
    constructor() {
      super(false, { message: `facilityDoesNotExist` });
    }
  }

  export class SlugAlreadyExistsError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `slugAlreadyExists`,
      });
    }
  }

  export class EnterpriseDoesNotExist extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'enterpriseDoesNotExist',
      });
    }
  }
}
