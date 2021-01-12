import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { EnterpriseDto } from 'modules/enterprise/application/dto';
import {
  GetEnterpriseQuery,
  GetEnterpriseResponse,
  GetEnterpriseErrors,
} from 'modules/enterprise/application/query/getEnterprise';

@Controller()
export class GetEnterpriseController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
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
      const result: GetEnterpriseResponse = await this.queryBus.execute(
        new GetEnterpriseQuery(enterpriseId),
      );

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
}
