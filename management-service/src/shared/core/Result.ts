import { ResultError } from './errors';

export class Result<R, E = ResultError> {
  public isSuccess: boolean;
  public error?: E;
  private readonly _value?: R;

  public constructor(isSuccess: boolean, error?: E, value?: R) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    this.isSuccess = isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): R {
    if (!this.isSuccess) {
      console.log(this.error);
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      );
    }

    return this._value;
  }

  public errorValue(): E {
    return this.error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(
    error: ResultError = { message: 'Unexpected error occurred' },
  ): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<unknown>[]): Result<unknown> {
    for (const result of results) {
      if (!result.isSuccess) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
