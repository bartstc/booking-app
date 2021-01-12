import { Result, DomainError } from 'shared/core';

export class EmployeeIsAlreadyInactiveGuard extends Result<DomainError> {
  constructor() {
    super(false, {
      message: `Employee is already inactive. Action is not allowed.`,
    });
  }
}
