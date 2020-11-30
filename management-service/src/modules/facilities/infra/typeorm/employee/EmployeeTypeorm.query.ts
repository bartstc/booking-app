import { EntityRepository, Repository } from 'typeorm/index';

import { EmployeeEntity } from './Employee.entity';
import { EmployeeQuery } from '../../EmployeeQuery';
import { EmployeeDto } from '../../../application/dto';
import { EmployeeTypeormTransformer } from './EmployeeTypeorm.transformer';

@EntityRepository(EmployeeEntity)
export class EmployeeTypeormQuery extends Repository<EmployeeEntity>
  implements EmployeeQuery {
  async getEmployeeById(employeeId: string): Promise<EmployeeDto> {
    const employee = await this.findOne({ employee_id: employeeId });
    if (!employee) throw new Error('Employee not found');
    return EmployeeTypeormTransformer.toDto(employee);
  }

  async getFacilityEmployees(facilityId: string): Promise<EmployeeDto[]> {
    const employees = await this.find({ facility_id: facilityId });
    return employees.length
      ? EmployeeTypeormTransformer.toDtoBulk(employees)
      : [];
  }
}
