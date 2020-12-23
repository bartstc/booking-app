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

import { DeactivateOfferResponse } from './DeactivateOffer.handler';
import { DeactivateOfferErrors } from './DeactivateOffer.errors';
import { DeactivateOfferCommand } from './DeactivateOffer.command';

@Controller()
export class DeactivateOfferController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('DeactivateOfferController');

  @Patch('facilities/:facilityId/offers/:offerId/deactivate')
  @ApiTags('Offers')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  @ApiMethodNotAllowedResponse({ description: 'Offer is already inactive' })
  async deactivateOffer(
    @Param('facilityId') facilityId: string,
    @Param('offerId') offerId: string,
    @Res() res: Response,
  ) {
    try {
      const result: DeactivateOfferResponse = await this.commandBus.execute(
        new DeactivateOfferCommand(facilityId, offerId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case DeactivateOfferErrors.OfferNotFoundError:
          case DeactivateOfferErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          case DeactivateOfferErrors.OfferIsAlreadyInactiveError:
            return this.methodNotAllowed(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer was successfully deactivated');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
