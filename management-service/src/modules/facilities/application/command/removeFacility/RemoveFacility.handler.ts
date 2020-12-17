import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveFacilityErrors } from './RemoveFacility.errors';
import { RemoveFacilityCommand } from './RemoveFacility.command';

import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { FacilityKeys } from '../../../FacilityKeys';
import { FacilityRepository } from '../../../domain';
import { EnterpriseRepository } from '../../../../enterprise/domain';

export type RemoveFacilityResponse = Either<
  | AppError.UnexpectedError
  | RemoveFacilityErrors.FacilityNotFoundError
  | RemoveFacilityErrors.EnterpriseNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveFacilityCommand)
export class RemoveFacilityHandler
  implements ICommandHandler<RemoveFacilityCommand, RemoveFacilityResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(EnterpriseKeys.EnterpriseRepository)
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
        return left(new RemoveFacilityErrors.EnterpriseNotFoundError());
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
