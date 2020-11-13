import { EntityRepository, Repository } from 'typeorm/index';

import { EmployeeEntity } from '../../infra/entities';
import { EmployeeRepo } from '../employeeRepo';
import { Employee } from '../../domain';
import { EmployeeMap } from './employee.map';

@EntityRepository(EmployeeEntity)
export class EmployeeRepository extends Repository<EmployeeEntity>
  implements EmployeeRepo {
  async exists(employeeId: string): Promise<boolean> {
    const existingEmployee = await this.createQueryBuilder(
      'employee',
    ).where('employee.employee_id = "employeeId', { employeeId });

    return !!existingEmployee;
  }

  async getEmployeeById(employeeId: string): Promise<Employee> {
    const employee = await this.findOne({ employee_id: employeeId });
    if (!employee) throw new Error('Employee not found');
    return EmployeeMap.toDomain(employee);
  }

  async getAllEmployees(facilityId: string): Promise<Employee[]> {
    const employees = await this.getRawAllEmployees(facilityId);
    return employees.length ? EmployeeMap.toDomainBulk(employees) : [];
  }

  async getRawAllEmployees(facilityId: string): Promise<EmployeeEntity[]> {
    return await this.find({ facility_id: facilityId });
  }

  async persistModel(employee: Employee): Promise<void> {
    await this.create(EmployeeMap.modelToPersistence(employee)).save();
  }

  async deleteEmployee(employeeId: string): Promise<void> {
    const result = await this.delete({ employee_id: employeeId });

    if (result.affected === 0) {
      throw new Error(`Employee with id ${employeeId} not found`);
    }
  }
}
