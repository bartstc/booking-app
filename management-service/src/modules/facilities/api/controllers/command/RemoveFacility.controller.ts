import { Response } from 'express';
import { Controller, Delete, Inject, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import {
  RemoveFacilityCommand,
  RemoveFacilityErrors,
  RemoveFacilityResponse,
} from 'modules/facilities/application/command/removeFacility';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class RemoveFacilityController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Delete('enterprises/:enterpriseId/facilities/:facilityId')
  @ApiTags('Facilities')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
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
          case RemoveFacilityErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Facility successfully deleted');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
