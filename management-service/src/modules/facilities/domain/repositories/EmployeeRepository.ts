import { Employee } from '../Employee';

export interface EmployeeRepository {
  exists(employeeId: string): Promise<boolean>;
  getEmployeeById(employeeId: string): Promise<Employee>;
  persist(employee: Employee): Promise<any>;
}
