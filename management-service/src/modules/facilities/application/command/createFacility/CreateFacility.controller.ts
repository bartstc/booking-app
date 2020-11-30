import { Body, Controller, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';

import { BaseController, ValidationTransformer } from 'shared/core';

import { CreateFacilityDto } from './CreateFacility.dto';
import { CreateFacilityResponse } from './CreateFacility.handler';
import { createFacilitySchema } from './CreateFacility.schema';
import { CreateFacilityCommand } from './CreateFacility.command';

@Controller()
export class CreateFacilityController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('CreateFacilityController');

  @Post('enterprises/:enterpriseId/facilities')
  async createFacility(
    @Param('enterpriseId') enterpriseId: string,
    @Body() dto: CreateFacilityDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        createFacilitySchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: CreateFacilityResponse = await this.commandBus.execute(
        new CreateFacilityCommand(dto, enterpriseId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.getValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Facility successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
