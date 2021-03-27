import { Body, Controller, Inject, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  UpdateFacilityDto,
  UpdateFacilityResponse,
  UpdateFacilityErrors,
  UpdateFacilityCommand,
} from 'modules/facilities/application/command/updateFacility';

import { createFacilitySchema } from '../../schemas';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class UpdateFacilityController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Put('enterprises/:enterpriseId/facilities/facilityId')
  @ApiTags('Facilities')
  @ApiResponse({ status: 201, description: 'Facility successfully updated' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async updateFacility(
    @Param('facilityId') facilityId: string,
    @Param('enterpriseId') enterpriseId: string,
    @Body() dto: UpdateFacilityDto,
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

      const result: UpdateFacilityResponse = await this.commandBus.execute(
        new UpdateFacilityCommand(enterpriseId, facilityId, dto),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case UpdateFacilityErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Facility successfully updated');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
