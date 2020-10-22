import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { EnterpriseService } from '../../services';
import { GetEnterpriseResponse } from './getEnterprise.case';
import { GetEnterpriseErrors } from './getEnterprise.errors';

@Controller()
export class GetEnterpriseController extends BaseController {
  constructor(private readonly service: EnterpriseService) {
    super();
  }

  private logger = new Logger('GetEnterpriseController');

  @Get('enterprises/:enterpriseId')
  async getEnterprise(
    @Param('enterpriseId') enterpriseId: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetEnterpriseResponse = await this.service.getEnterprise(
        enterpriseId,
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
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
