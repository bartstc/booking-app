import { Result, DomainError } from 'shared/core';

export class CannotRemoveActiveEmployeeGuard extends Result<DomainError> {
  constructor() {
    super(false, {
      message: `Cannot remove employee which is active.`,
    });
  }
}
