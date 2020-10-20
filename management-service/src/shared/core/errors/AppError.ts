import { UnknownError } from './UnknownError';
import { ResultError } from './ResultError';
import { Result } from '../Result';

export namespace AppError {
  export class UnexpectedError extends Result<UnknownError> {
    public constructor(err: any) {
      super(false, {
        message: `Unexpected server error`,
        error: err,
      });
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }
  }

  export class ValidationError extends Result<ResultError> {
    constructor({ message, error }: ResultError) {
      super(false, {
        message,
        error,
      });
    }
  }
}
