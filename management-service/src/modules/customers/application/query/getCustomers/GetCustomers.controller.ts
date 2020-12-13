import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
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

import { CustomerDto } from '../../dto';
import { CustomerQuery } from '../../../infra';
import { FacilityRepository } from '../../../../facilities/infra';
import { GetCustomersErrors } from './GetCustomers.errors';

type GetCustomersResponse = Either<
  AppError.UnexpectedError,
  Result<CustomerDto[]>
>;

@Controller()
export class GetCustomersController extends BaseController {
  constructor(
    private readonly customerQuery: CustomerQuery,
    private readonly facilityRepository: FacilityRepository,
  ) {
    super();
  }

  private logger = new Logger('GetCustomersController');

  @Get('facilities/:facilityId/customers')
  @ApiTags('Customers')
  @ApiOkResponse({ type: CustomerDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getCustomers(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Customers successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }

  private async handler(facilityId: string): Promise<GetCustomersResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(
          new GetCustomersErrors.FacilityDoesNotExistError(facilityId),
        );
      }

      try {
        dto = await this.customerQuery.getFacilityCustomers(facilityId);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
