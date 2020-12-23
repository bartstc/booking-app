import { CommandBus } from '@nestjs/cqrs';
import { Controller, Logger, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import { ActivateOfferResponse } from './ActivateOffer.handler';
import { ActivateOfferErrors } from './ActivateOffer.errors';
import { ActivateOfferCommand } from './ActivateOffer.command';

@Controller()
export class ActivateOfferController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('ActivateOfferController');

  @Patch('facilities/:facilityId/offers/:offerId/activate')
  @ApiTags('Offers')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  @ApiMethodNotAllowedResponse({ description: 'Offer is already active' })
  async activateOffer(
    @Param('facilityId') facilityId: string,
    @Param('offerId') offerId: string,
    @Res() res: Response,
  ) {
    try {
      const result: ActivateOfferResponse = await this.commandBus.execute(
        new ActivateOfferCommand(facilityId, offerId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case ActivateOfferErrors.OfferNotFoundError:
          case ActivateOfferErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          case ActivateOfferErrors.OfferIsAlreadyActiveError:
            return this.methodNotAllowed(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer was successfully activated');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
