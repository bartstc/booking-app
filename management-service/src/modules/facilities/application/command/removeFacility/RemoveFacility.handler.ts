import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveFacilityErrors } from './RemoveFacility.errors';
import { RemoveFacilityCommand } from './RemoveFacility.command';
import { FacilityRepository } from '../../../infra';

import { EnterpriseRepository } from '../../../../enterprise/infra';

export type RemoveFacilityResponse = Either<
  AppError.UnexpectedError | RemoveFacilityErrors.FacilityNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveFacilityCommand)
export class RemoveFacilityHandler
  implements ICommandHandler<RemoveFacilityCommand, RemoveFacilityResponse> {
  constructor(
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    private enterpriseRepository: EnterpriseRepository,
  ) {}

  async execute({
    facilityId,
    enterpriseId,
  }: RemoveFacilityCommand): Promise<RemoveFacilityResponse> {
    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );
      if (!enterpriseExists) {
        return left(new RemoveFacilityErrors.EnterpriseDoesNotExist());
      }

      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new RemoveFacilityErrors.FacilityNotFoundError());
      }

      await this.facilityRepository.deleteFacility(facilityId);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
