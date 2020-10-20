interface IUseCaseError {
  message: string;
}

export abstract class UseCaseError implements IUseCaseError {
  protected constructor(public readonly message: string) {
    this.message = message;
  }
}
