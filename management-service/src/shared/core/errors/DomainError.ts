interface IDomainError {
  message: string;
}

export abstract class DomainError implements IDomainError {
  protected constructor(public readonly message: string) {
    this.message = message;
  }
}
