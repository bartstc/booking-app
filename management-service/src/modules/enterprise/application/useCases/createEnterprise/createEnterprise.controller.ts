import { Response } from 'express';
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';

import { BaseController } from 'shared/core';

import { EnterpriseService } from '../../services';
import { CreateEnterpriseDto } from './createEnterprise.dto';
import { CreateEnterpriseResponse } from './createEnterprise.case';

@Controller()
export class CreateEnterpriseController extends BaseController {
  constructor(private readonly enterpriseService: EnterpriseService) {
    super();
  }

  logger = new Logger('CreateEnterpriseController');

  @Post('enterprises')
  async createEnterprise(
    @Body() createEnterpriseDto: CreateEnterpriseDto,
    @Res() res: Response,
  ) {
    try {
      const result: CreateEnterpriseResponse = await this.enterpriseService.createEnterprise(
        createEnterpriseDto,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.getValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Enterprise successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
