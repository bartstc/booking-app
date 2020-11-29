import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { GetFacilityErrors } from './getFacility.errors';
import { FacilityDto } from '../../dtos';
import { FacilityMap, FacilityRepository } from '../../../adapter';

type GetFacilityResponse = Either<
  GetFacilityErrors.FacilityDoesNotExistError | AppError.UnexpectedError,
  Result<FacilityDto>
>;

@Injectable()
export class GetFacilityCase
  implements UseCase<string, Promise<GetFacilityResponse>> {
  constructor(private repository: FacilityRepository) {}

  async execute(facilityId: string): Promise<GetFacilityResponse> {
    let facilityRaw;

    try {
      try {
        facilityRaw = await this.repository.getRawFacilityById(facilityId);
      } catch {
        return left(
          new GetFacilityErrors.FacilityDoesNotExistError(facilityId),
        );
      }

      return right(Result.ok(FacilityMap.rawToDto(facilityRaw)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
