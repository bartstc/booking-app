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
  ActivateOfferCommand,
  ActivateOfferErrors,
  ActivateOfferResponse,
} from 'modules/facilities/application/command/activateOffer';
import { OfferIsAlreadyActiveGuard } from '../../../application/guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class ActivateOfferController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

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
          case OfferIsAlreadyActiveGuard:
            return this.methodNotAllowed(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Offer was successfully activated');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
