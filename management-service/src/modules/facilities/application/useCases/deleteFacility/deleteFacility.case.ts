import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { DeleteFacilityErrors } from './deleteFacility.errors';
import { DeleteFacilityDto } from './deleteFacility.dto';
import { FacilityRepository } from '../../../adapter';

export type DeleteFacilityResponse = Either<
  AppError.UnexpectedError | DeleteFacilityErrors.FacilityNotFoundError,
  Result<void>
>;

export class DeleteFacilityCase
  implements UseCase<DeleteFacilityDto, Promise<DeleteFacilityResponse>> {
  constructor(
    @InjectRepository(FacilityRepository)
    private repository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
  }: DeleteFacilityDto): Promise<DeleteFacilityResponse> {
    try {
      const facilityExists = await this.repository.exists(facilityId);
      if (!facilityExists) {
        return left(new DeleteFacilityErrors.FacilityNotFoundError());
      }

      await this.repository.deleteFacility(facilityId);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
