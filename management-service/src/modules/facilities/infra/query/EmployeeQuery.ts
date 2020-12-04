import { EmployeeDto } from '../../application/dto';

export interface EmployeeQuery {
  getEmployeeById(employeeId: string): Promise<EmployeeDto>;
  getFacilityEmployees(facilityId: string): Promise<EmployeeDto[]>;
}
