import { Response } from 'express';
import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { RemoveFacilityErrors } from './RemoveFacility.errors';
import { RemoveFacilityResponse } from './RemoveFacility.handler';
import { RemoveFacilityCommand } from './RemoveFacility.command';

@Controller()
export class RemoveFacilityController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('DeleteFacilityController');

  @Delete('enterprises/:enterpriseId/facilities/:facilityId')
  async deleteFacility(
    @Param('facilityId') facilityId: string,
    @Param('enterpriseId') enterpriseId: string,
    @Res() res: Response,
  ) {
    try {
      const result: RemoveFacilityResponse = await this.commandBus.execute(
        new RemoveFacilityCommand(facilityId, enterpriseId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case RemoveFacilityErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Facility successfully deleted');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
