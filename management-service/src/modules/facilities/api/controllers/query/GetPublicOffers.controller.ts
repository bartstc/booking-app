import { Controller, Get, Inject, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { OfferCollectionDto } from 'modules/facilities/application/dto';
import {
  GetPublicOffersResponse,
  GetPublicOffersQuery,
} from 'modules/facilities/application/query/getPublicOffers';
import {
  PublicOfferCollectionQueryParams,
  PublicOfferCollectionOrder,
} from '../../../adapter/params';
import { PriceModel } from '../../../domain/types';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetPublicOffersController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('offers')
  @ApiTags('Offers')
  @ApiOkResponse({ type: OfferCollectionDto, isArray: true })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'priceType', enum: PriceModel, required: false })
  @ApiQuery({
    name: 'order',
    enum: PublicOfferCollectionOrder,
    required: false,
  })
  async getOffers(
    @Query() params: PublicOfferCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const result: GetPublicOffersResponse = await this.queryBus.execute(
        new GetPublicOffersQuery(params),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.log('Offers successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
