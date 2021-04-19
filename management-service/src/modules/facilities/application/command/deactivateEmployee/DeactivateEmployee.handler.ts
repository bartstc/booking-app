import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { DeactivateEmployeeErrors } from './DeactivateEmployee.errors';
import { DeactivateEmployeeCommand } from './DeactivateEmployee.command';
import {
  Employee,
  EmployeeRepository,
  FacilityRepository,
} from '../../../domain';
import { FacilityKeys } from '../../../FacilityKeys';
import { EmployeeIsAlreadyInactiveGuard } from '../../guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { IAmqpService } from '../../../../../amqp';
import {
  EmployeeDeactivatedEvent,
  FacilitiesEvent,
} from '../../../domain/events';

export type DeactivateEmployeeResponse = Either<
  | AppError.UnexpectedError
  | DeactivateEmployeeErrors.FacilityNotFoundError
  | DeactivateEmployeeErrors.EmployeeNotFoundError
  | EmployeeIsAlreadyInactiveGuard,
  Result<void>
>;

@CommandHandler(DeactivateEmployeeCommand)
export class DeactivateEmployeeHandler
  implements
    ICommandHandler<DeactivateEmployeeCommand, DeactivateEmployeeResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(FacilityKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @Inject(InfrastructureKeys.AmqpService)
    private amqpService: IAmqpService,
  ) {}

  async execute({
    facilityId,
    employeeId,
  }: DeactivateEmployeeCommand): Promise<DeactivateEmployeeResponse> {
    let employee: Employee;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new DeactivateEmployeeErrors.FacilityNotFoundError());
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
        FacilitiesEvent.EmployeeDeactivated,
      );

      await entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
