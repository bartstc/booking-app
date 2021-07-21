import { Controller, Get, Inject, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { EmployeeCollectionDto } from '../../../application/dto';
import {
  GetEmployeesQuery,
  GetEmployeesResponse,
  GetEmployeesErrors,
} from '../../../application/query/getEmployees';
import {
  EmployeeCollectionOrder,
  EmployeeCollectionQueryParams,
} from '../../../adapter/params';
import { EmployeeStatus } from '../../../domain/types';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetEmployeesController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.EmployeesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('enterprises/:enterpriseId/employees')
  @ApiTags('Employees')
  @ApiOkResponse({ type: EmployeeCollectionDto, isArray: true })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'query', type: 'string', required: false })
  @ApiQuery({ name: 'status', enum: EmployeeStatus, required: false })
  @ApiQuery({ name: 'order', enum: EmployeeCollectionOrder, required: false })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  async getEmployees(
    @Param('enterpriseId') enterpriseId: string,
    @Query() params: EmployeeCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const result: GetEmployeesResponse = await this.queryBus.execute(
        new GetEmployeesQuery(enterpriseId, params),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEmployeesErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Employees successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
