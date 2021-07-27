import { EmployeeScopeDto } from '../application/dto';

export interface EmployeeScopeQuery {
  getEmployeeScopeByEmployeeId(employeeId: string): Promise<EmployeeScopeDto>;
}
