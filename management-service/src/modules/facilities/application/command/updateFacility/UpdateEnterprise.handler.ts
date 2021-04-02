import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { UpdateFacilityErrors } from './UpdateFacility.errors';
import { UpdateFacilityCommand } from './UpdateFacility.command';
import { FacilityMap } from '../../../adapter';
import { FacilityKeys } from '../../../FacilityKeys';
import { FacilityRepository, Slug } from '../../../domain';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain';

export type UpdateFacilityResponse = Either<
  | AppError.UnexpectedError
  | AppError.ValidationError
  | UpdateFacilityErrors.FacilityDoesNotExist
  | UpdateFacilityErrors.SlugAlreadyExistsError
  | UpdateFacilityErrors.EnterpriseDoesNotExist,
  Result<void>
>;

@CommandHandler(UpdateFacilityCommand)
export class UpdateFacilityHandler
  implements ICommandHandler<UpdateFacilityCommand, UpdateFacilityResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
  ) {}

  async execute({
    facilityId,
    enterpriseId,
    dto,
  }: UpdateFacilityCommand): Promise<UpdateFacilityResponse> {
    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );
      if (!enterpriseExists) {
        return left(new UpdateFacilityErrors.EnterpriseDoesNotExist());
      }

      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new UpdateFacilityErrors.FacilityDoesNotExist());
      }

      const facilityOrError = FacilityMap.dtoToDomain(
        dto,
        enterpriseId,
        facilityId,
      );
      if (!facilityOrError.isSuccess) {
        return left(Result.fail(facilityOrError.error));
      }

      const facility = facilityOrError.getValue();

      const dtoSlug = Slug.create({ value: dto.slug });

      if (facility.slug.value !== dtoSlug.getValue().value) {
        const slugExists = await this.facilityRepository.slugExists(
          dtoSlug.getValue(),
        );

        if (slugExists) {
          return left(new UpdateFacilityErrors.SlugAlreadyExistsError());
        }
      }

      const entity = await this.facilityRepository.persist(facility);
      entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
