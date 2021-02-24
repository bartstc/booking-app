import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
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
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetEnterpriseController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.EnterpriseLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

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

      this.logger.log('Enterprise successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
