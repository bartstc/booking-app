import { EmployeeDto } from '../../../application/dto';
import { EmployeeEntity } from './Employee.entity';

export class EmployeeTypeormTransformer {
  public static toDtoBulk(employees: EmployeeEntity[]): EmployeeDto[] {
    return employees.map((employee) => this.toDto(employee));
  }

  public static toDto(employee: EmployeeEntity): EmployeeDto {
    return {
      employeeId: employee.employee_id,
      enterpriseId: employee.enterprise_id,
      status: employee.status,
      email: employee.details.email,
      name: employee.details.name,
      position: employee.details.position,
      contacts: employee.details.contacts,
      birthDate: employee.details.birthDate,
      employmentDate: employee.details.employmentDate,
    };
  }
}
