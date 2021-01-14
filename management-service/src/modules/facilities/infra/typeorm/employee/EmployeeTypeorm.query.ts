import { EntityRepository } from 'typeorm/index';

import { BaseQuery, QueryListResult } from 'shared/core';

import { EmployeeEntity } from './Employee.entity';
import { EmployeeDto } from '../../../application/dto';
import { EmployeeTypeormTransformer } from './EmployeeTypeorm.transformer';
import { EmployeeQuery, EmployeeCollectionQueryParams } from '../../../adapter';

@EntityRepository(EmployeeEntity)
export class EmployeeTypeormQuery
  extends BaseQuery<EmployeeEntity>
  implements EmployeeQuery {
  async getEmployeeById(employeeId: string): Promise<EmployeeDto> {
    const employee = await this.findOne({ employee_id: employeeId });
    if (!employee) throw new Error('Employee not found');
    return EmployeeTypeormTransformer.toDto(employee);
  }

  async getEmployees(
    facilityId: string,
    { query = '', limit = 10, offset = 0 }: EmployeeCollectionQueryParams,
  ): Promise<QueryListResult<EmployeeDto>> {
    const [collection, total] = await this.paginatedQueryBuilder('employee', {
      limit,
      offset,
    })
      .where('employee.facility_id = :facilityId', { facilityId })
      .andWhere(
        `employee.details::jsonb->>'name' ilike '%${query}%' OR employee.details::jsonb->>'position' ilike '%${query}%'`,
      )
      .getManyAndCount();

    return {
      collection: EmployeeTypeormTransformer.toDtoBulk(collection),
      meta: {
        total,
        offset,
        limit,
      },
    };
  }
}
