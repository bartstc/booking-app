import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm/index';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { EmployeeId, EmployeeRepository } from '../../../domain';
import { CreateOwnerEmployeeErrors } from './CreateOwnerEmployee.errors';
import { CreateOwnerEmployeeCommand } from './CreateOwnerEmployee.command';
import { EmployeeMap, EmployeeQuery } from '../../../adapter';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { IAmqpService } from '../../../../../amqp';
import { EmployeeTransformer } from '../../../infra';
import { EmployeeKeys } from '../../../EmployeeKeys';
import { EmployeeAddedEvent, EmployeesEvent } from '../../../domain/events';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain';

export type CreateOwnerEmployeeResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | CreateOwnerEmployeeErrors.EmployeeEmailAlreadyInUseError
  | CreateOwnerEmployeeErrors.EnterpriseNotFoundError,
  Result<EmployeeId>
>;

@CommandHandler(CreateOwnerEmployeeCommand)
export class CreateOwnerEmployeeHandler
  implements
    ICommandHandler<CreateOwnerEmployeeCommand, CreateOwnerEmployeeResponse> {
  constructor(
    @Inject(InfrastructureKeys.DbService)
    private connection: Connection,
    @Inject(InfrastructureKeys.AmqpService)
    private amqpService: IAmqpService,
    @Inject(EmployeeKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
    @Inject(EmployeeKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
  ) {}

  async execute({
    dto,
    enterpriseId,
  }: CreateOwnerEmployeeCommand): Promise<CreateOwnerEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );

      if (!enterpriseExists) {
        return left(new CreateOwnerEmployeeErrors.EnterpriseNotFoundError());
      }

      try {
        const employee = await this.employeeQuery.getEmployeeByEmail(
          dto.employeeEmail,
        );

        if (employee) {
          return left(
            new CreateOwnerEmployeeErrors.EmployeeEmailAlreadyInUseError(),
          );
        }
      } catch {}

      const employeeOrError = EmployeeMap.dtoToDomain({ dto, enterpriseId });

      if (!employeeOrError.isSuccess) {
        return left(Result.fail(employeeOrError.error));
      }

      const employee = employeeOrError.getValue();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const employeeEntity = await this.employeeRepository.persist(employee);
      await queryRunner.manager.save(employeeEntity);

      await this.amqpService.sendMessage(
        new EmployeeAddedEvent(EmployeeTransformer.toDto(employeeEntity)),
        EmployeesEvent.EmployeeAdded,
      );

      await queryRunner.commitTransaction();

      return right(Result.ok(employee.employeeId));
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return left(new AppError.UnexpectedError(err));
    } finally {
      await queryRunner.release();
    }
  }
}
