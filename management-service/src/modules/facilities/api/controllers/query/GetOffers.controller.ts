import { Controller, Get, Logger, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { OfferDto } from 'modules/facilities/application/dto';
import {
  GetOffersResponse,
  GetOffersQuery,
  GetOffersErrors,
} from 'modules/facilities/application/query/getOffers';
import {
  OfferCollectionOrder,
  OfferCollectionQueryParams,
} from '../../../adapter/params';
import { OfferStatus, PriceModel } from '../../../domain/types';

@Controller()
export class GetOffersController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  private logger = new Logger('GetOffersController');

  @Get('facilities/:facilityId/offers')
  @ApiTags('Offers')
  @ApiOkResponse({ type: OfferDto, isArray: true })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'priceType', enum: PriceModel, required: false })
  @ApiQuery({ name: 'status', enum: OfferStatus, required: false })
  @ApiQuery({ name: 'order', enum: OfferCollectionOrder, required: false })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getOffers(
    @Param('facilityId') facilityId: string,
    @Query() params: OfferCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const result: GetOffersResponse = await this.queryBus.execute(
        new GetOffersQuery(facilityId, params),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetOffersErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offers successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
