import { CommandBus } from '@nestjs/cqrs';
import { Controller, Delete, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import {
  RemoveOfferCommand,
  RemoveOfferErrors,
  RemoveOfferResponse,
} from 'modules/facilities/application/command/removeOffer';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class RemoveOfferController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Delete('facilities/:facilityId/offers/:offerId')
  @ApiTags('Offers')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  async removeOffer(
    @Param('facilityId') facilityId: string,
    @Param('offerId') offerId: string,
    @Res() res: Response,
  ) {
    try {
      const result: RemoveOfferResponse = await this.commandBus.execute(
        new RemoveOfferCommand(facilityId, offerId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case RemoveOfferErrors.OfferNotFoundError:
          case RemoveOfferErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Offer successfully removed');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
