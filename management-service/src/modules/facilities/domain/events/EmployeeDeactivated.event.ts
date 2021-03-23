import { EmployeeStatus } from '../types';

export class EmployeeDeactivatedEvent {
  private readonly status = EmployeeStatus.Inactive;
}
