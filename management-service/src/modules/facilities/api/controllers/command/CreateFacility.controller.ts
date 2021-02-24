import { Body, Controller, Inject, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  CreateFacilityCommand,
  CreateFacilityDto,
  CreateFacilityResponse,
} from 'modules/facilities/application/command/createFacility';

import { createFacilitySchema } from '../../schemas';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class CreateFacilityController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Post('enterprises/:enterpriseId/facilities')
  @ApiTags('Facilities')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
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
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.log('Facility successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
