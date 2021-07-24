import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm/index';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { EmployeeId, EmployeeRepository } from '../../../domain';
import { AddEmployeeErrors } from './AddEmployee.errors';
import { AddEmployeeCommand } from './AddEmployee.command';
import { EmployeeMap, EmployeeQuery } from '../../../adapter';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { IAmqpService } from '../../../../../amqp';
import { IAuthService } from '../../../../../auth';
import { EmployeeTransformer } from '../../../infra';
import { EmployeeKeys } from '../../../EmployeeKeys';
import { EmployeeAddedEvent, EmployeesEvent } from '../../../domain/events';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import {
  Enterprise,
  EnterpriseId,
  EnterpriseRepository,
} from '../../../../enterprise/domain';
import { UniqueEntityID } from '../../../../../shared/domain';

export type AddEmployeeResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddEmployeeErrors.EmployeeEmailAlreadyInUseError
  | AddEmployeeErrors.EnterpriseNotFoundError,
  Result<EmployeeId>
>;

@CommandHandler(AddEmployeeCommand)
export class AddEmployeeHandler
  implements ICommandHandler<AddEmployeeCommand, AddEmployeeResponse> {
  constructor(
    @Inject(InfrastructureKeys.DbService)
    private connection: Connection,
    @Inject(InfrastructureKeys.AmqpService)
    private amqpService: IAmqpService,
    @Inject(InfrastructureKeys.AuthService)
    private authService: IAuthService,
    @Inject(EmployeeKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
    @Inject(EmployeeKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
  ) {}

  async execute({
    dto: addEmployeeDto,
    enterpriseId,
  }: AddEmployeeCommand): Promise<AddEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();
    const { password, ...dto } = addEmployeeDto;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );

      if (!enterpriseExists) {
        return left(new AddEmployeeErrors.EnterpriseNotFoundError());
      }

      try {
        const employee = await this.employeeQuery.getEmployeeByEmail(
          dto.employeeEmail,
        );

        if (employee) {
          return left(new AddEmployeeErrors.EmployeeEmailAlreadyInUseError());
        }
      } catch {}

      const employeeOrError = EmployeeMap.dtoToDomain({
        dto,
        enterpriseId,
      });

      if (!employeeOrError.isSuccess) {
        return left(Result.fail(employeeOrError.error));
      }

      await this.authService.signup(dto.employeeEmail, password);

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
