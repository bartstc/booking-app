import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { Enterprise, EnterpriseRepository } from '../../../domain';
import { EnterpriseMap } from '../../../adapter';
import { CreateEnterpriseCommand } from './CreateEnterprise.command';
import { EnterpriseKeys } from '../../../EnterpriseKeys';

export type CreateEnterpriseResponse = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<Enterprise>
>;

@CommandHandler(CreateEnterpriseCommand)
export class CreateEnterpriseHandler
  implements
    ICommandHandler<CreateEnterpriseCommand, CreateEnterpriseResponse> {
  constructor(
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private repository: EnterpriseRepository,
  ) {}

  async execute({
    createEnterpriseDto: dto,
  }: CreateEnterpriseCommand): Promise<CreateEnterpriseResponse> {
    try {
      const enterpriseOrError = EnterpriseMap.dtoToDomain(dto, dto.ownerId);

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
