import { Response } from 'express';
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BaseController, ValidationTransformer } from 'shared/core';

import { CreateEnterpriseDto } from './CreateEnterprise.dto';
import { CreateEnterpriseResponse } from './CreateEnterprise.handler';
import { createEnterpriseSchema } from './CreateEnterprise.schema';
import { CreateEnterpriseCommand } from './CreateEnterprise.command';

@Controller()
export class CreateEnterpriseController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('CreateEnterpriseController');

  @Post('enterprises')
  async createEnterprise(
    @Body() dto: CreateEnterpriseDto,
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

      const result: CreateEnterpriseResponse = await this.commandBus.execute(
        new CreateEnterpriseCommand(dto),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Enterprise successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
