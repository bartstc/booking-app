import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { CreateFacilityDto } from './createFacility.dto';
import { Facility } from '../../../domain';
import { FacilityRepository } from '../../../adapter';
import { FacilityFactory } from '../../factories';

export type CreateFacilityResponse = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<Facility>
>;

@Injectable()
export class CreateFacilityCase
  implements UseCase<CreateFacilityDto, Promise<CreateFacilityResponse>> {
  constructor(
    private repository: FacilityRepository,
    private facilityFactory: FacilityFactory,
  ) {}

  async execute(
    dto: CreateFacilityDto,
    enterpriseId: string,
  ): Promise<CreateFacilityResponse> {
    try {
      const facilityOrError = this.facilityFactory.buildFromDto(
        dto,
        enterpriseId,
      );

      if (!facilityOrError.isSuccess) {
        return left(Result.fail(facilityOrError.error));
      }

      const facility = facilityOrError.getValue();
      const facilityEntity = await this.repository.persistModel(facility);
      await facilityEntity.save();

      return right(Result.ok(facility));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
