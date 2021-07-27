import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { DeactivateEmployeeErrors } from './DeactivateEmployee.errors';
import { DeactivateEmployeeCommand } from './DeactivateEmployee.command';
import { Employee, EmployeeRepository } from '../../../domain';
import { EmployeeIsAlreadyInactiveGuard } from '../../guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { IAmqpService } from '../../../../../amqp';
import {
  EmployeeDeactivatedEvent,
  EmployeesEvent,
} from '../../../domain/events';
import { EmployeeKeys } from '../../../EmployeeKeys';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain';
import { AddEmployeeErrors } from '../addEmployee';

export type DeactivateEmployeeResponse = Either<
  | AppError.UnexpectedError
  | DeactivateEmployeeErrors.EmployeeNotFoundError
  | DeactivateEmployeeErrors.EnterpriseNotFoundError
  | EmployeeIsAlreadyInactiveGuard,
  Result<void>
>;

@CommandHandler(DeactivateEmployeeCommand)
export class DeactivateEmployeeHandler
  implements
    ICommandHandler<DeactivateEmployeeCommand, DeactivateEmployeeResponse> {
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
  }: DeactivateEmployeeCommand): Promise<DeactivateEmployeeResponse> {
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
        return left(new DeactivateEmployeeErrors.EmployeeNotFoundError());
      }

      if (!employee.isActive) {
        return left(new EmployeeIsAlreadyInactiveGuard());
      }

      employee.deactivate();

      const entity = await this.employeeRepository.persist(employee);

      await this.amqpService.sendMessage(
        new EmployeeDeactivatedEvent(employee.employeeId.id.toString()),
        EmployeesEvent.EmployeeDeactivated,
      );

      await entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
