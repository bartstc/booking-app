import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { GetEnterpriseErrors } from './getEnterprise.errors';
import { GetEnterpriseCase, GetEnterpriseResponse } from './getEnterprise.case';

@Controller()
export class GetEnterpriseController extends BaseController {
  constructor(private readonly getEnterpriseCase: GetEnterpriseCase) {
    super();
  }

  private logger = new Logger('GetEnterpriseController');

  @Get('enterprises/:enterpriseId')
  async getEnterprise(
    @Param('enterpriseId') enterpriseId: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetEnterpriseResponse = await this.getEnterpriseCase.execute(
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
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
