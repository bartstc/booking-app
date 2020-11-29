import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { UpdateEnterpriseErrors } from './updateEnterprise.errors';
import { UpdateEnterpriseDto } from './updateEnterprise.dto';
import { EnterpriseMap, EnterpriseRepository } from '../../../adapter';

export type UpdateEnterpriseResponse = Either<
  | AppError.UnexpectedError
  | AppError.ValidationError
  | UpdateEnterpriseErrors.EnterpriseNotFoundError,
  Result<void>
>;

@Injectable()
export class UpdateEnterpriseCase
  implements UseCase<UpdateEnterpriseDto, Promise<UpdateEnterpriseResponse>> {
  constructor(private repository: EnterpriseRepository) {}

  async execute(
    dto: UpdateEnterpriseDto,
    enterpriseId: string,
  ): Promise<UpdateEnterpriseResponse> {
    try {
      const enterpriseExists = await this.repository.exists(enterpriseId);
      if (!enterpriseExists) {
        return left(
          new UpdateEnterpriseErrors.EnterpriseNotFoundError(enterpriseId),
        );
      }

      await this.repository
        .create(EnterpriseMap.dtoToPersistence(enterpriseId, dto))
        .save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
