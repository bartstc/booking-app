import React from 'react';
import { useIntl } from 'react-intl';
import { IconButtonProps } from '@chakra-ui/react';
import { mdiFilterOff } from '@mdi/js';

import { IQueryParams } from 'types';
import { DEFAULT_PARAMS } from 'constant';

import { IconButton } from '../Button';
import { useQueryParams } from '../Params';

interface IProps<Params extends IQueryParams> extends Omit<IconButtonProps, 'aria-label'> {
  defaultParams?: Params;
}

const ClearFiltersIconButton = <Params extends IQueryParams>({ defaultParams, ...props }: IProps<Params>) => {
  const { formatMessage } = useIntl();
  const { set } = useQueryParams();

  return (
    <IconButton
      title={formatMessage({ id: 'clear-filters', defaultMessage: 'Clear filters' })}
      path={mdiFilterOff}
      variant='solid'
      onClick={() => set(defaultParams ?? DEFAULT_PARAMS)}
      {...props}
    />
  );
};

export { ClearFiltersIconButton };
