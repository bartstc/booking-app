export interface IGuardResult {
  succeeded: boolean;
  message: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

const getSuccessResult = (argumentName: string): IGuardResult => ({
  succeeded: true,
  message: `${argumentName}.correct`,
});

export class Guard {
  public static greaterThan(
    minValue: number,
    actualValue: number,
    argumentName: string,
  ): IGuardResult {
    return actualValue > minValue
      ? getSuccessResult(argumentName)
      : {
          succeeded: false,
          message: `${argumentName}.shouldBeGreaterThan${minValue}`,
        };
  }

  public static allAtLeast(numChars: number, args: IGuardArgument[]) {
    for (const arg of args) {
      const result = this.againstAtLeast({ numChars, ...arg });
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentName);
  }

  public static againstAtLeast({
    argumentName,
    numChars,
    argument,
  }: {
    numChars: number;
    argument: string;
    argumentName: string;
  }): IGuardResult {
    return argument.length >= numChars
      ? getSuccessResult(argumentName)
      : {
          succeeded: false,
          message: `${argumentName}.shouldBeAtLeast${numChars}chars`,
        };
  }

  public static allAtMost(numChars: number, args: IGuardArgument[]) {
    for (const arg of args) {
      const result = this.againstAtMost({ numChars, ...arg });
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentName);
  }

  public static againstAtMost({
    numChars,
    argumentName,
    argument,
  }: {
    numChars: number;
    argument: string;
    argumentName: string;
  }): IGuardResult {
    return argument.length <= numChars
      ? getSuccessResult(argumentName)
      : {
          succeeded: false,
          message: `${argumentName}.shouldBeLowerThan${numChars}chars`,
        };
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string,
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName}.shouldBeDefined`,
      };
    } else {
      return getSuccessResult(argumentName);
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection,
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentName);
  }

  public static isOneOf({
    value,
    validValues,
    argumentName,
  }: {
    value: any;
    validValues: any[];
    argumentName: string;
  }): IGuardResult {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return getSuccessResult(argumentName);
    } else {
      return {
        succeeded: false,
        message: `${argumentName}.isInvalidType`,
      };
    }
  }

  public static inRange({
    argumentName,
    max,
    min,
    num,
  }: {
    num: number;
    min: number;
    max: number;
    argumentName: string;
  }): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName}.shouldBeWithinRange${min}to${max}`,
      };
    } else {
      return getSuccessResult(argumentName);
    }
  }

  public static allInRange({
    min,
    max,
    args,
  }: {
    min: number;
    max: number;
    args: IGuardArgument[];
  }): IGuardResult {
    let failingResult: IGuardResult | null = null;
    for (const { argument, argumentName } of args) {
      const numIsInRangeResult = this.inRange({
        num: argument,
        min,
        max,
        argumentName,
      });
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return failingResult;
    } else {
      return getSuccessResult(args[0].argumentName);
    }
  }

  public static isListOfStrings(list: any, argumentName: string): IGuardResult {
    let failingResult: IGuardResult | null = null;

    if (!Array.isArray(list)) {
      return {
        succeeded: false,
        message: `${argumentName}.shouldBeArray`,
      };
    }

    if (list.length === 0) {
      return {
        succeeded: false,
        message: `${argumentName}.shouldBeNotEmpty`,
      };
    }

    for (const item in list) {
      const isStringResult = this.isString(item, 'listItem');
      if (!isStringResult.succeeded) {
        failingResult = isStringResult;
      }
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName}.allItemsShouldBeTypeOfString`,
      };
    }
    return getSuccessResult(argumentName);
  }

  public static isStringBulk(args: GuardArgumentCollection): IGuardResult {
    for (const arg of args) {
      const result = this.isString(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentName);
  }

  public static isString(value: any, argumentName: string): IGuardResult {
    if (typeof value === 'string' || value instanceof String) {
      return getSuccessResult(argumentName);
    }

    return {
      succeeded: false,
      message: `${argumentName}.shouldBeString`,
    };
  }

  public static allIsNumber(args: GuardArgumentCollection): IGuardResult {
    for (const arg of args) {
      const result = this.isNumber(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentName);
  }

  public static isNumber(value: any, argumentName: string): IGuardResult {
    if (typeof value === 'number') {
      return getSuccessResult(argumentName);
    }
    return {
      succeeded: false,
      message: `${argumentName}.shouldBeNumber`,
    };
  }
}
