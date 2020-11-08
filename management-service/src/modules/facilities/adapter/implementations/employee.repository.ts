import { EntityRepository, Repository } from 'typeorm/index';

import { EmployeeEntity } from '../../infra/entities';
import { EmployeeRepo } from '../employeeRepo';
import { Employee } from '../../domain';
import { EmployeeMap } from './employee.map';

@EntityRepository(EmployeeEntity)
export class EmployeeRepository extends Repository<EmployeeEntity>
  implements EmployeeRepo {
  async getEmployeeById(employeeId: string): Promise<Employee> {
    const employee = await this.findOne({ employee_id: employeeId });
    if (!employee) throw new Error('Employee not found');
    return EmployeeMap.toDomain(employee);
  }

  async getEmployees(ids: string[]): Promise<Employee[]> {
    const employees = await this.findByIds(ids);
    return employees.length ? EmployeeMap.toDomainBulk(employees) : [];
  }
}
