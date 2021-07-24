import { EntityRepository, Repository } from 'typeorm/index';

import { Employee, EmployeeRepository } from '../../../domain';
import { EmployeeEntity } from './Employee.entity';
import { EmployeeMap } from '../../../adapter';

@EntityRepository(EmployeeEntity)
export class EmployeeTypeormRepository
  extends Repository<EmployeeEntity>
  implements EmployeeRepository {
  async exists(employeeId: string): Promise<boolean> {
    try {
      await this.getRawEmployeeById(employeeId);
    } catch {
      return false;
    }

    return true;
  }

  async getEmployeeById(employeeId: string): Promise<Employee> {
    const employee = await this.getRawEmployeeById(employeeId);
    return EmployeeMap.entityToDomain(employee);
  }

  private async getRawEmployeeById(
    employeeId: string,
  ): Promise<EmployeeEntity> {
    const employee = await this.findOne({ employee_id: employeeId });
    if (!employee) throw new Error('Employee not found');
    return employee;
  }

  async persist(employee: Employee): Promise<EmployeeEntity> {
    return this.create(EmployeeMap.toPersistence(employee));
  }
}
