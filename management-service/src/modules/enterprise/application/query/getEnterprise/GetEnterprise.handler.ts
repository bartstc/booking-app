import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { GetEnterpriseErrors } from './GetEnterprise.errors';
import { GetEnterpriseQuery } from './GetEnterprise.query';
import { EnterpriseKeys } from '../../../EnterpriseKeys';
import { EnterpriseQuery } from '../../../adapter';
import { EnterpriseDto } from '../../dto';

export type GetEnterpriseResponse = Either<
  GetEnterpriseErrors.EnterpriseDoesNotExistError,
  Result<EnterpriseDto>
>;

@QueryHandler(GetEnterpriseQuery)
export class GetEnterpriseHandler
  implements IQueryHandler<GetEnterpriseQuery, GetEnterpriseResponse> {
  constructor(
    @Inject(EnterpriseKeys.EnterpriseQuery)
    private enterpriseQuery: EnterpriseQuery,
  ) {}

  async execute({
    enterpriseId,
  }: GetEnterpriseQuery): Promise<GetEnterpriseResponse> {
    let dto;

    try {
      try {
        dto = await this.enterpriseQuery.getEnterpriseById(enterpriseId);
      } catch {
        return left(
          new GetEnterpriseErrors.EnterpriseDoesNotExistError(enterpriseId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
