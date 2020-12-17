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

import { GetCustomerErrors } from './GetCustomer.errors';
import { CustomerDto } from '../../dto';
import { CustomerKeys } from '../../../CustomerKeys';
import { FacilityKeys } from '../../../../facilities/FacilityKeys';
import { CustomerQuery } from '../../../adapter';
import { FacilityRepository } from '../../../../facilities/domain';

type GetCustomerResponse = Either<
  | AppError.UnexpectedError
  | GetCustomerErrors.CustomerDoesNotExistError
  | GetCustomerErrors.FacilityDoesNotExistError,
  Result<CustomerDto>
>;

@Controller()
export class GetCustomerController extends BaseController {
  constructor(
    @Inject(CustomerKeys.CustomerQuery)
    private readonly customerQuery: CustomerQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private readonly facilityRepository: FacilityRepository,
  ) {
    super();
  }

  private logger = new Logger('GetCustomerController');

  @Get('facilities/:facilityId/customers/:customerId')
  @ApiTags('Customers')
  @ApiOkResponse({ type: CustomerDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async getCustomer(
    @Param('facilityId') facilityId: string,
    @Param('customerId') customerId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(customerId, facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetCustomerErrors.CustomerDoesNotExistError:
          case GetCustomerErrors.FacilityDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Customer successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }

  private async handler(
    customerId: string,
    facilityId: string,
  ): Promise<GetCustomerResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(
          new GetCustomerErrors.FacilityDoesNotExistError(facilityId),
        );
      }

      try {
        dto = await this.customerQuery.getCustomerById(customerId);
      } catch {
        return left(
          new GetCustomerErrors.CustomerDoesNotExistError(customerId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
