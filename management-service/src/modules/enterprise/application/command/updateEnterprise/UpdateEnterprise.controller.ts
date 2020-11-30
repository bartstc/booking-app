import { Body, Controller, Logger, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';

import { BaseController, ValidationTransformer } from 'shared/core';

import { createEnterpriseSchema } from '../createEnterprise/CreateEnterprise.schema';
import { UpdateEnterpriseResponse } from './UpdateEnterprise.handler';
import { UpdateEnterpriseDto } from './UpdateEnterprise.dto';
import { UpdateEnterpriseErrors } from './UpdateEnterprise.errors';
import { UpdateEnterpriseCommand } from './UpdateEnterprise.command';

@Controller()
export class UpdateEnterpriseController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
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

      const result: UpdateEnterpriseResponse = await this.commandBus.execute(
        new UpdateEnterpriseCommand(enterpriseId, dto),
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
