import { Body, Controller, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  AddOfferCommand,
  AddOfferDto,
  AddOfferErrors,
  AddOfferResponse,
} from 'modules/facilities/application/command/addOffer';
import { addOfferSchema } from '../../schemas';

@Controller()
export class AddOfferController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('AddOfferController');

  @Post('facilities/:facilityId/offers')
  @ApiTags('Offers')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async addOffer(
    @Param('facilityId') facilityId: string,
    @Body() dto: AddOfferDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        addOfferSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: AddOfferResponse = await this.commandBus.execute(
        new AddOfferCommand(dto, facilityId),
      );

      if (result.isLeft()) {
        const error = result.value;
        console.log(error);
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case AddOfferErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer successfully added');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}
