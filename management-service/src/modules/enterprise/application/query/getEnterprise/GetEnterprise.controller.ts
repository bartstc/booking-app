import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  AppError,
  BaseController,
  Either,
  left,
  Result,
  right,
} from 'shared/core';

import { GetEnterpriseErrors } from './GetEnterprise.errors';
import { EnterpriseQuery } from '../../../infra';
import { EnterpriseDto } from '../../dto';

type GetEnterpriseResponse = Either<
  GetEnterpriseErrors.EnterpriseDoesNotExistError,
  Result<EnterpriseDto>
>;

@Controller()
export class GetEnterpriseController extends BaseController {
  constructor(private readonly enterpriseQuery: EnterpriseQuery) {
    super();
  }

  private logger = new Logger('GetEnterpriseController');

  @Get('enterprises/:enterpriseId')
  @ApiTags('Enterprises')
  @ApiOkResponse({ type: EnterpriseDto })
  @ApiNotFoundResponse()
  async getEnterprise(
    @Param('enterpriseId') enterpriseId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(enterpriseId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEnterpriseErrors.EnterpriseDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Enterprise successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }

  private async handler(enterpriseId: string): Promise<GetEnterpriseResponse> {
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
