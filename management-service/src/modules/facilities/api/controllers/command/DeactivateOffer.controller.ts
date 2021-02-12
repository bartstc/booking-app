import { CommandBus } from '@nestjs/cqrs';
import { Controller, Inject, Logger, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import {
  DeactivateOfferCommand,
  DeactivateOfferErrors,
  DeactivateOfferResponse,
} from 'modules/facilities/application/command/deactivateOffer';
import { OfferIsAlreadyInactiveGuard } from '../../../application/guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class DeactivateOfferController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

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
          case OfferIsAlreadyInactiveGuard:
            return this.methodNotAllowed(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Offer was successfully deactivated');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
