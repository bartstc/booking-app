import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { Slug, FacilityRepository } from '../../../domain';
import { CreateFacilityCommand } from './CreateFacility.command';
import { CreateFacilityErrors } from './CreateFacility.errors';

import { FacilityMap } from '../../../adapter';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain';
import { FacilityKeys } from '../../../FacilityKeys';

import { EmployeeKeys } from '../../../../employees/EmployeeKeys';
import { Employee, EmployeeRepository } from '../../../../employees/domain';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';

export type CreateFacilityResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | CreateFacilityErrors.SlugAlreadyExistsError
  | CreateFacilityErrors.EnterpriseDoesNotExistError
  | CreateFacilityErrors.CreatorDoesNotExistError,
  Result<void>
>;

@CommandHandler(CreateFacilityCommand)
export class CreateFacilityHandler
  implements ICommandHandler<CreateFacilityCommand, CreateFacilityResponse> {
  constructor(
    @Inject(InfrastructureKeys.DbService)
    private connection: Connection,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
    // todo: instead of injecting repo from separate module, send event about change in employee aggregate
    @Inject(EmployeeKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    dto,
    enterpriseId,
  }: CreateFacilityCommand): Promise<CreateFacilityResponse> {
    const queryRunner = this.connection.createQueryRunner();

    let employee: Employee;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );
      if (!enterpriseExists) {
        return left(new CreateFacilityErrors.EnterpriseDoesNotExistError());
      }

      const slug = Slug.create({ value: dto.slug });
      const slugExists = await this.facilityRepository.slugExists(
        slug.getValue(),
      );

      if (slugExists) {
        return left(new CreateFacilityErrors.SlugAlreadyExistsError());
      }

      try {
        employee = await this.employeeRepository.getEmployeeById(dto.creatorId);
      } catch {
        return left(new CreateFacilityErrors.CreatorDoesNotExistError());
      }

      const facilityOrError = FacilityMap.dtoToDomain(dto, enterpriseId);

      if (!facilityOrError.isSuccess) {
        return left(Result.fail(facilityOrError.error));
      }

      const facility = facilityOrError.getValue();
      employee.extendAvailableFacilities([facility.facilityId]);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(
        await this.facilityRepository.persist(facility),
      );
      await queryRunner.manager.save(
        await this.employeeRepository.persist(employee),
      );

      await queryRunner.commitTransaction();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
