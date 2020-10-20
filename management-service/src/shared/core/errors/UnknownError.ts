interface IUnknownError {
  message: string;
}

export abstract class UnknownError implements IUnknownError {
  protected constructor(readonly message: string, readonly error: any) {
    this.message = message;
    this.error = error;
  }
}
