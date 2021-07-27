import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { GetEnterpriseByOwnerIdErrors } from './GetEnterpriseByOwnerId.errors';
import { GetEnterpriseByOwnerIdQuery } from './GetEnterpriseByOwnerId.query';
import { EnterpriseKeys } from '../../../EnterpriseKeys';
import { EnterpriseQuery } from '../../../adapter';
import { EnterpriseDto } from '../../dto';

export type GetEnterpriseByOwnerIdResponse = Either<
  GetEnterpriseByOwnerIdErrors.EnterpriseDoesNotExistError,
  Result<EnterpriseDto>
>;

@QueryHandler(GetEnterpriseByOwnerIdQuery)
export class GetEnterpriseByOwnerIdHandler
  implements
    IQueryHandler<GetEnterpriseByOwnerIdQuery, GetEnterpriseByOwnerIdResponse> {
  constructor(
    @Inject(EnterpriseKeys.EnterpriseQuery)
    private enterpriseQuery: EnterpriseQuery,
  ) {}

  async execute({
    ownerId,
  }: GetEnterpriseByOwnerIdQuery): Promise<GetEnterpriseByOwnerIdResponse> {
    let dto;

    try {
      try {
        dto = await this.enterpriseQuery.getEnterpriseByOwnerId(ownerId);
      } catch {
        return left(
          new GetEnterpriseByOwnerIdErrors.EnterpriseDoesNotExistError(ownerId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
