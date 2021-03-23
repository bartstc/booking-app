import { EmployeeStatus } from '../types';

export class EmployeeActivatedEvent {
  private readonly status = EmployeeStatus.Active;
}
