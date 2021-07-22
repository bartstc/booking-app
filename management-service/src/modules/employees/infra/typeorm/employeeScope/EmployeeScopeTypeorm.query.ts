import { EntityRepository, Repository } from 'typeorm/index';

import { EmployeeScopeQuery } from '../../../adapter';
import { EmployeeScopeEntity } from './EmployeeScope.entity';
import { EmployeeScopeDto } from '../../../application/dto';
import { EmployeeScopeTransformer } from './index';

@EntityRepository(EmployeeScopeEntity)
export class EmployeeScopeTypeormQuery
  extends Repository<EmployeeScopeEntity>
  implements EmployeeScopeQuery {
  async getEmployeeScopeByEmployeeId(
    employeeId: string,
  ): Promise<EmployeeScopeDto> {
    const employeeScope = await this.findOne({ employee_id: employeeId });
    if (!employeeScope) throw new Error('EmployeeScope not found');
    return EmployeeScopeTransformer.toDto(employeeScope);
  }
}
