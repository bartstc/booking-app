import { mapQueryParamsBeforeRender } from './mapQueryParamsBeforeRender';

import { IQueryParams } from 'types';

const withPaginationParamsCorrector = (defaults: IQueryParams) =>
  mapQueryParamsBeforeRender<IQueryParams>(({ params, location }) => {
    if (location.search === '') {
      return defaults;
    }

    if ([isNaN(params.limit), isNaN(params.offset)].some(val => val)) {
      return defaults;
    }

    return params;
  });

export { withPaginationParamsCorrector };