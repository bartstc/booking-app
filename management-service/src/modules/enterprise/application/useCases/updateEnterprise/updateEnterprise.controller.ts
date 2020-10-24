import { Body, Controller, Logger, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  UpdateEnterpriseCase,
  UpdateEnterpriseResponse,
} from './updateEnterprise.case';
import { UpdateEnterpriseDto } from './updateEnterprise.dto';
import { createEnterpriseSchema } from '../createEnterprise';
import { UpdateEnterpriseErrors } from './updateEnterprise.errors';

@Controller()
export class UpdateEnterpriseController extends BaseController {
  constructor(private readonly updateEnterpriseCase: UpdateEnterpriseCase) {
    super();
  }

  logger = new Logger('UpdateEnterpriseController');

  @Put('enterprises/:enterpriseId')
  async updateEnterprise(
    @Param('enterpriseId') enterpriseId: string,
    @Body() dto: UpdateEnterpriseDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        createEnterpriseSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: UpdateEnterpriseResponse = await this.updateEnterpriseCase.execute(
        dto,
        enterpriseId,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case UpdateEnterpriseErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Enterprise successfully updated');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
