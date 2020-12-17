import { Controller, Get, Inject, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  AppError,
  BaseController,
  Either,
  left,
  Result,
  right,
} from 'shared/core';

import { OfferDto } from '../../dto';
import { GetOffersErrors } from './GetOffers.errors';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferQuery } from '../../../adapter';
import { FacilityRepository } from '../../../domain';

type GetOffersResponse = Either<AppError.UnexpectedError, Result<OfferDto[]>>;

@Controller()
export class GetOffersController extends BaseController {
  constructor(
    @Inject(FacilityKeys.OfferQuery)
    private offerQuery: OfferQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {
    super();
  }

  private logger = new Logger('GetOffersController');

  @Get('facilities/:facilityId/offers')
  @ApiTags('Offers')
  @ApiOkResponse({ type: OfferDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getOffers(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(facilityId);

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

  private async handler(facilityId: string): Promise<GetOffersResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new GetOffersErrors.FacilityNotFoundError(facilityId));
      }

      try {
        dto = await this.offerQuery.getFacilityOffers(facilityId);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
