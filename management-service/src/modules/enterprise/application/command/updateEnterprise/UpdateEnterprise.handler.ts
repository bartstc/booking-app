import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { UpdateEnterpriseErrors } from './UpdateEnterprise.errors';
import { UpdateEnterpriseCommand } from './UpdateEnterprise.command';
import { EnterpriseMap, EnterpriseRepository } from '../../../infra';

export type UpdateEnterpriseResponse = Either<
  | AppError.UnexpectedError
  | AppError.ValidationError
  | UpdateEnterpriseErrors.EnterpriseNotFoundError,
  Result<void>
>;

@CommandHandler(UpdateEnterpriseCommand)
export class UpdateEnterpriseHandler
  implements
    ICommandHandler<UpdateEnterpriseCommand, UpdateEnterpriseResponse> {
  constructor(private repository: EnterpriseRepository) {}

  async execute({
    enterpriseId,
    dto,
  }: UpdateEnterpriseCommand): Promise<UpdateEnterpriseResponse> {
    try {
      const enterpriseExists = await this.repository.exists(enterpriseId);
      if (!enterpriseExists) {
        return left(
          new UpdateEnterpriseErrors.EnterpriseNotFoundError(enterpriseId),
        );
      }

      const enterpriseOrError = EnterpriseMap.dtoToDomain(dto);
      if (!enterpriseOrError.isSuccess) {
        return left(Result.fail(enterpriseOrError.error));
      }

      const entity = await this.repository.persist(
        enterpriseOrError.getValue(),
      );
      entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
