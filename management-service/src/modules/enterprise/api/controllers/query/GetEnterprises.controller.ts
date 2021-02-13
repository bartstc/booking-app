import { Controller, Get, Inject, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import { EnterpriseDto } from 'modules/enterprise/application/dto';

import { EnterpriseKeys } from '../../../EnterpriseKeys';
import { EnterpriseQuery } from '../../../adapter';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetEnterprisesController extends BaseController {
  constructor(
    @Inject(EnterpriseKeys.EnterpriseQuery)
    private enterpriseQuery: EnterpriseQuery,
    @Inject(InfrastructureKeys.EnterpriseLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('enterprises')
  @ApiTags('Enterprises')
  @ApiOkResponse({ type: EnterpriseDto, isArray: true })
  async getEnterprises(@Res() res: Response) {
    try {
      const result = await this.enterpriseQuery.getEnterprises();

      this.logger.log('Enterprises successfully returned');
      return this.ok(res, result);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
