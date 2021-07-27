import { IBusinessRule } from 'shared/domain/types';

import { EmployeeStatus } from '../types';

export class EmployeeCannotBeInactiveRule implements IBusinessRule {
  constructor(
    private readonly status: EmployeeStatus,
    public readonly message = 'Employee cannot be inactive',
  ) {}

  public isBroken(): boolean {
    return this.status === EmployeeStatus.Inactive;
  }
}
