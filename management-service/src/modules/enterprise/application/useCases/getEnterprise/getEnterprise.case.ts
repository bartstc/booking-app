import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { EnterpriseMap, EnterpriseRepository } from '../../../adapter';
import { Enterprise } from '../../../domain';
import { EnterpriseDto } from '../../dtos';
import { GetEnterpriseErrors } from './getEnterprise.errors';

export type GetEnterpriseResponse = Either<
  GetEnterpriseErrors.EnterpriseDoesNotExistError,
  Result<EnterpriseDto>
>;

@Injectable()
export class GetEnterpriseCase
  implements UseCase<string, Promise<GetEnterpriseResponse>> {
  constructor(
    @InjectRepository(EnterpriseRepository)
    private repository: EnterpriseRepository,
  ) {}

  async execute(enterpriseId: string): Promise<GetEnterpriseResponse> {
    let enterprise: Enterprise;

    try {
      try {
        enterprise = await this.repository.getEnterpriseById(enterpriseId);
      } catch {
        return left(
          new GetEnterpriseErrors.EnterpriseDoesNotExistError(enterpriseId),
        );
      }

      return right(Result.ok(EnterpriseMap.toDto(enterprise)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
