import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { Slug } from '../../../domain';
import { FacilityMap, FacilityRepository } from '../../../infra';
import { CreateFacilityCommand } from './CreateFacility.command';
import { CreateFacilityErrors } from './CreateFacility.errors';

import { EnterpriseRepository } from '../../../../enterprise/infra';

export type CreateFacilityResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | CreateFacilityErrors.SlugAlreadyExistsError
  | CreateFacilityErrors.EnterpriseDoesNotExist,
  Result<void>
>;

@CommandHandler(CreateFacilityCommand)
export class CreateFacilityHandler
  implements ICommandHandler<CreateFacilityCommand, CreateFacilityResponse> {
  constructor(
    private facilityRepository: FacilityRepository,
    private enterpriseRepository: EnterpriseRepository,
  ) {}

  async execute({
    dto,
    enterpriseId,
  }: CreateFacilityCommand): Promise<CreateFacilityResponse> {
    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );
      if (!enterpriseExists) {
        return left(new CreateFacilityErrors.EnterpriseDoesNotExist());
      }

      const slug = Slug.create({ value: dto.slug });
      const slugExists = await this.facilityRepository.slugExists(
        slug.getValue(),
      );

      if (slugExists) {
        return left(new CreateFacilityErrors.SlugAlreadyExistsError());
      }

      const facilityOrError = FacilityMap.dtoToDomain(dto, enterpriseId);

      if (!facilityOrError.isSuccess) {
        return left(Result.fail(facilityOrError.error));
      }

      const facility = facilityOrError.getValue();
      const facilityEntity = await this.facilityRepository.persist(facility);
      await facilityEntity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
