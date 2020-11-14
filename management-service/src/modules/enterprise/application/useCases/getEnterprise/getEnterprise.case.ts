import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { EnterpriseMap, EnterpriseRepository } from '../../../adapter';
import { EnterpriseDto } from '../../dtos';
import { GetEnterpriseErrors } from './getEnterprise.errors';

export type GetEnterpriseResponse = Either<
  GetEnterpriseErrors.EnterpriseDoesNotExistError,
  Result<EnterpriseDto>
>;

@Injectable()
export class GetEnterpriseCase
  implements UseCase<string, Promise<GetEnterpriseResponse>> {
  constructor(private repository: EnterpriseRepository) {}

  async execute(enterpriseId: string): Promise<GetEnterpriseResponse> {
    let enterpriseRaw;

    try {
      try {
        enterpriseRaw = await this.repository.getRawEnterpriseById(
          enterpriseId,
        );
      } catch {
        return left(
          new GetEnterpriseErrors.EnterpriseDoesNotExistError(enterpriseId),
        );
      }

      return right(Result.ok(EnterpriseMap.rawToDto(enterpriseRaw)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
