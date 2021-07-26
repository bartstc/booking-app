import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { EmployeeDto } from '../../../application/dto';
import {
  GetEmployeeByEmailResponse,
  GetEmployeeByEmailQuery,
  GetEmployeeByEmailErrors,
} from '../../../application/query/getEmployeeByEmail';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetEmployeeByEmailController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.EmployeesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('employees/email/:email')
  @ApiTags('Employees')
  @ApiOkResponse({ type: EmployeeDto })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  async getEmployeeByEmail(
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetEmployeeByEmailResponse = await this.queryBus.execute(
        new GetEmployeeByEmailQuery(email),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetEmployeeByEmailErrors.EmployeeDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Employee successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
