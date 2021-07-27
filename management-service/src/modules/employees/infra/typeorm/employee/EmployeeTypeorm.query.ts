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

  async getEmployeeByEmail(employeeEmail: string): Promise<EmployeeDto> {
    const employee = await this.createQueryBuilder('employee')
      .where(`employee.details::jsonb->>'email' = :employeeEmail`, {
        employeeEmail,
      })
      .getOne();

    if (!employee) throw new Error('Employee not found');
    return EmployeeTypeormTransformer.toDto(employee);
  }

  async getEmployees(
    enterpriseId: string,
    {
      query: searchQuery = '',
      limit = 10,
      offset = 0,
      status = '' as any,
      order: orderKey,
    }: EmployeeCollectionQueryParams,
  ): Promise<QueryListResult<EmployeeDto>> {
    let query = this.paginatedQueryBuilder('employee', {
      limit,
      offset,
    })
      .where('employee.enterprise_id = :enterpriseId', { enterpriseId })
      .andWhere(`employee.status ilike '%${status}%'`)
      .andWhere(
        `employee.details::jsonb->>'name' ilike '%${searchQuery}%' OR employee.details::jsonb->>'position' ilike '%${searchQuery}%'`,
      );

    if (orderKey) {
      const [sort, order] = this.extractOrder(orderKey);

      const allowedOrderKeys = ['employmentDate', 'birthDate'];
      if (allowedOrderKeys.includes(sort)) {
        query = query.orderBy(`employee.details::jsonb->>'${sort}'`, order);
      } else if (sort === 'status') {
        query = query.orderBy(`employee.status`, order);
      }
    }

    const [collection, total] = await query.getManyAndCount();

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
