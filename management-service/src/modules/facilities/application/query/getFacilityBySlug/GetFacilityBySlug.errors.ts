import { Result, UseCaseError } from 'shared/core';

export namespace GetFacilityBySlugErrors {
  export class FacilityDoesNotExistError extends Result<UseCaseError> {
    constructor(slug: string) {
      super(false, {
        message: `Facility with slug ${slug} does not exist`,
      });
    }
  }
}
