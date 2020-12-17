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

import { GetOfferErrors } from './GetOffer.errors';
import { OfferDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferQuery } from '../../../adapter';
import { FacilityRepository } from '../../../domain';

type GetOfferResponse = Either<
  AppError.UnexpectedError | GetOfferErrors.OfferDoesNotExistError,
  Result<OfferDto>
>;

@Controller()
export class GetOfferController extends BaseController {
  constructor(
    @Inject(FacilityKeys.OfferQuery)
    private offerQuery: OfferQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {
    super();
  }

  private logger = new Logger('GetOfferController');

  @Get('facilities/:facilityId/offers/:offerId')
  @ApiTags('Offers')
  @ApiOkResponse({ type: OfferDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  async getOffer(
    @Param('offerId') offerId: string,
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(offerId, facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetOfferErrors.OfferDoesNotExistError:
          case GetOfferErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }

  private async handler(
    offerId: string,
    facilityId: string,
  ): Promise<GetOfferResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new GetOfferErrors.FacilityNotFoundError(facilityId));
      }

      try {
        dto = await this.offerQuery.getOfferById(offerId);
      } catch {
        return left(new GetOfferErrors.OfferDoesNotExistError(offerId));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
