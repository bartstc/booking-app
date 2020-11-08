import { Employee } from '../domain';

export interface EmployeeRepo {
  getEmployeeById(employeeId: string): Promise<Employee>;
  getEmployees(ids: string[]): Promise<Employee[]>;
  // persistModel(employee: Employee): Promise<void>;
}
