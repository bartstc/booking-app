import { Body, Controller, Inject, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  UpdateEnterpriseDto,
  UpdateEnterpriseResponse,
  UpdateEnterpriseErrors,
  UpdateEnterpriseCommand,
} from 'modules/enterprise/application/command/updateEnterprise';

import { updateEnterpriseSchema } from '../../schemas';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class UpdateEnterpriseController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.EnterpriseLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Put('enterprises/:enterpriseId')
  @ApiTags('Enterprises')
  @ApiResponse({ status: 201, description: 'Enterprise successfully updated' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async updateEnterprise(
    @Param('enterpriseId') enterpriseId: string,
    @Body() dto: UpdateEnterpriseDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        updateEnterpriseSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: UpdateEnterpriseResponse = await this.commandBus.execute(
        new UpdateEnterpriseCommand(enterpriseId, dto),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case UpdateEnterpriseErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Enterprise successfully updated');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
