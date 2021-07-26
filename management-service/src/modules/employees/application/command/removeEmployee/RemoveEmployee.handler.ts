import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm/index';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveEmployeeErrors } from './RemoveEmployee.errors';
import { RemoveEmployeeCommand } from './RemoveEmployee.command';
import { Employee, EmployeeRepository } from '../../../domain';
import { EntityName } from '../../../adapter';
import { EmployeeKeys } from '../../../EmployeeKeys';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { CannotRemoveActiveEmployeeGuard } from '../../../../facilities/application/guards';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain';

export type RemoveEmployeeResponse = Either<
  | AppError.UnexpectedError
  | RemoveEmployeeErrors.EmployeeNotFoundError
  | RemoveEmployeeErrors.EnterpriseNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveEmployeeCommand)
export class RemoveEmployeeHandler
  implements ICommandHandler<RemoveEmployeeCommand, RemoveEmployeeResponse> {
  constructor(
    @Inject(InfrastructureKeys.DbService)
    private connection: Connection,
    @Inject(EmployeeKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
  ) {}

  async execute({
    employeeId,
    enterpriseId,
  }: RemoveEmployeeCommand): Promise<RemoveEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();

    let employee: Employee;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );

      if (!enterpriseExists) {
        return left(new RemoveEmployeeErrors.EnterpriseNotFoundError());
      }

      try {
        employee = await this.employeeRepository.getEmployeeById(employeeId);
      } catch {
        return left(new RemoveEmployeeErrors.EmployeeNotFoundError());
      }

      if (employee.isActive) {
        return left(new CannotRemoveActiveEmployeeGuard());
      }

      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.delete(EntityName.Employee, {
        employee_id: employeeId,
      });

      await queryRunner.commitTransaction();

      return right(Result.ok());
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return left(new AppError.UnexpectedError(err));
    } finally {
      await queryRunner.release();
    }
  }
}
