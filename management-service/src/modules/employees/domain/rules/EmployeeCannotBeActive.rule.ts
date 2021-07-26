import { IBusinessRule } from 'shared/domain/types';

import { EmployeeStatus } from '../types';

export class EmployeeCannotBeActiveRule implements IBusinessRule {
  constructor(
    private readonly status: EmployeeStatus,
    public readonly message = 'Employee cannot be active',
  ) {}

  public isBroken(): boolean {
    return this.status === EmployeeStatus.Active;
  }
}
