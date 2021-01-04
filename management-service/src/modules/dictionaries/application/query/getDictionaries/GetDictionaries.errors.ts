import { Result, UseCaseError } from 'shared/core';

export namespace GetDictionariesErrors {
  export class DictionaryTypeIsRequiredError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `You must provide dictionary type`,
      });
    }
  }
}
