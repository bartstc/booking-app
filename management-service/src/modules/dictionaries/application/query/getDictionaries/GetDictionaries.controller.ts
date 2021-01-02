import { Controller, Get, Inject, Logger, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  AppError,
  BaseController,
  Either,
  left,
  Result,
  right,
} from 'shared/core';

import { DictionaryCollectionDto } from '../../dto';
import { DictionaryKeys } from '../../../DictionaryKeys';
import { DictionaryParams, DictionaryQuery } from '../../../adapter';
import { DictionaryType } from '../../../domain';
import { GetDictionariesErrors } from './GetDictionaries.errors';

type GetDictionariesResponse = Either<
  | AppError.UnexpectedError
  | GetDictionariesErrors.DictionaryTypeIsRequiredError,
  Result<DictionaryCollectionDto>
>;

@Controller()
export class GetDictionariesController extends BaseController {
  constructor(
    @Inject(DictionaryKeys.DictionaryQuery)
    private readonly dictionaryQuery: DictionaryQuery,
  ) {
    super();
  }

  private logger = new Logger('GetDictionariesController');

  @Get('dictionaries')
  @ApiTags('Dictionaries')
  @ApiOkResponse({ type: DictionaryCollectionDto })
  @ApiUnprocessableEntityResponse({
    description: `"type" parameter is required`,
  })
  @ApiQuery({ name: 'type', enum: DictionaryType, required: true })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'query', type: 'string', required: false })
  async getDictionaries(
    @Query() params: DictionaryParams,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(params);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetDictionariesErrors.DictionaryTypeIsRequiredError:
            return this.clientError(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Dictionaries successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }

  private async handler(params: any): Promise<GetDictionariesResponse> {
    let dto;

    try {
      if (!params.type) {
        return left(new GetDictionariesErrors.DictionaryTypeIsRequiredError());
      }

      try {
        dto = await this.dictionaryQuery.getDictionaries(params);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
