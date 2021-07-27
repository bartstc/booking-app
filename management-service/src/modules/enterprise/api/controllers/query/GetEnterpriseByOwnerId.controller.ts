import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { EnterpriseDto } from 'modules/enterprise/application/dto';
import {
  GetEnterpriseByOwnerIdQuery,
  GetEnterpriseByOwnerIdResponse,
  GetEnterpriseByOwnerIdErrors,
} from 'modules/enterprise/application/query/getEnterpriseByOwnerId';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetEnterpriseByOwnerIdController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.EnterpriseLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('enterprises/owner/:ownerId')
  @ApiTags('Enterprises')
  @ApiOkResponse({ type: EnterpriseDto })
  @ApiNotFoundResponse()
  async getEnterprise(@Param('ownerId') ownerId: string, @Res() res: Response) {
    try {
      const result: GetEnterpriseByOwnerIdResponse = await this.queryBus.execute(
        new GetEnterpriseByOwnerIdQuery(ownerId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEnterpriseByOwnerIdErrors.EnterpriseDoesNotExistError:
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
