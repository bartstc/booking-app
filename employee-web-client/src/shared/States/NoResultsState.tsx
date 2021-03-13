import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Image, useBreakpointValue } from '@chakra-ui/react';

import image from '../../assets/images/no-results.png';
import { State } from './components';
import { ClearFiltersButton } from '../Filters';
import { filtersAreApplied, useQueryParams } from '../Params';
import { IQueryParams } from '../../types';
import { EmptyState } from './EmptyState';

const NoResultsState = () => {
  const { formatMessage } = useIntl();
  const { params } = useQueryParams<IQueryParams>();
  const filtersApplied = filtersAreApplied(params);
  const size = useBreakpointValue({ base: '210px', md: '360px', lg: '460px' });

  if (!filtersApplied) {
    return <EmptyState />;
  }

  return (
    <State
      image={
        <Image
          src={image}
          alt={formatMessage({
            id: 'no-results-error',
            defaultMessage: 'No results',
          })}
          width={size}
          mt={8}
        />
      }
      header={<FormattedMessage id='no-results-state-header' defaultMessage='No results found' />}
      description={
        <FormattedMessage
          id='no-results-description'
          defaultMessage='Enter other search parameters. If you think there is a problem, please contact our administrator.'
        />
      }
    >
      <ClearFiltersButton />
    </State>
  );
};

export { NoResultsState };
