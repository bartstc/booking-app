import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { ActivateEmployeeErrors } from './ActivateEmployee.errors';
import { ActivateEmployeeCommand } from './ActivateEmployee.command';
import { Employee, EmployeeRepository } from '../../../domain';
import { EmployeeIsAlreadyActiveGuard } from '../../guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { IAmqpService } from '../../../../../amqp';
import { EmployeeActivatedEvent, EmployeesEvent } from '../../../domain/events';
import { EmployeeKeys } from '../../../EmployeeKeys';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain';
import { AddEmployeeErrors } from '../addEmployee';

export type ActivateEmployeeResponse = Either<
  | AppError.UnexpectedError
  | ActivateEmployeeErrors.EmployeeNotFoundError
  | ActivateEmployeeErrors.EnterpriseNotFoundError
  | EmployeeIsAlreadyActiveGuard,
  Result<void>
>;

@CommandHandler(ActivateEmployeeCommand)
export class ActivateEmployeeHandler
  implements
    ICommandHandler<ActivateEmployeeCommand, ActivateEmployeeResponse> {
  constructor(
    @Inject(EmployeeKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
    @Inject(InfrastructureKeys.AmqpService)
    private amqpService: IAmqpService,
  ) {}

  async execute({
    employeeId,
    enterpriseId,
  }: ActivateEmployeeCommand): Promise<ActivateEmployeeResponse> {
    let employee: Employee;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );

      if (!enterpriseExists) {
        return left(new AddEmployeeErrors.EnterpriseNotFoundError());
      }

      try {
        employee = await this.employeeRepository.getEmployeeById(employeeId);
      } catch {
        return left(new ActivateEmployeeErrors.EmployeeNotFoundError());
      }

      if (employee.isActive) {
        return left(new EmployeeIsAlreadyActiveGuard());
      }

      employee.activate();

      const entity = await this.employeeRepository.persist(employee);

      await this.amqpService.sendMessage(
        new EmployeeActivatedEvent(employee.employeeId.id.toString()),
        EmployeesEvent.EmployeeActivated,
      );

      await entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
