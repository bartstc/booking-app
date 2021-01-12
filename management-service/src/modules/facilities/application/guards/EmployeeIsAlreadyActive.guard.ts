import { Result, DomainError } from 'shared/core';

export class EmployeeIsAlreadyActiveGuard extends Result<DomainError> {
  constructor() {
    super(false, {
      message: `Employee is already active. Action is not allowed.`,
    });
  }
}
