import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { OfferDto } from 'modules/facilities/application/dto';
import {
  GetPublicOfferQuery,
  GetPublicOfferResponse,
  GetPublicOfferErrors,
} from 'modules/facilities/application/query/getPublicOffer';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetPublicOfferController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('offers/:offerId')
  @ApiTags('Offers')
  @ApiOkResponse({ type: OfferDto })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  async getOffer(@Param('offerId') offerId: string, @Res() res: Response) {
    try {
      const result: GetPublicOfferResponse = await this.queryBus.execute(
        new GetPublicOfferQuery(offerId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetPublicOfferErrors.OfferDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Offer successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
