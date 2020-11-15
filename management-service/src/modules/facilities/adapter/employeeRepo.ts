import { Employee } from '../domain';
import { EmployeeEntity } from '../infra/entities';

export interface EmployeeRepo {
  exists(employeeId: string): Promise<boolean>;
  getEmployeeById(employeeId: string): Promise<Employee>;
  getAllEmployees(facilityId: string): Promise<Employee[]>;
  getRawEmployeeById(employeeId: string): Promise<EmployeeEntity>;
  getRawAllEmployees(facilityId: string): Promise<EmployeeEntity[]>;
  persistModel(employee: Employee): Promise<EmployeeEntity>;
}
