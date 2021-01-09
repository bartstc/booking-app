import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ButtonProps } from '@chakra-ui/react';
import { mdiFilterOff } from '@mdi/js';

import { DEFAULT_PARAMS } from 'constant';
import { DefaultQueryParams } from 'types';

import { Button } from '../Button';
import { useQueryParams } from '../Params';
import { Icon } from '../Icon';

interface IProps<Params extends DefaultQueryParams> extends ButtonProps {
  defaultParams?: Params;
}

const ClearFiltersButton = <Params extends DefaultQueryParams>({ defaultParams, ...props }: IProps<Params>) => {
  const { set } = useQueryParams();

  return (
    <Button colorScheme='primary' leftIcon={<Icon path={mdiFilterOff} />} onClick={() => set(defaultParams ?? DEFAULT_PARAMS)} {...props}>
      <FormattedMessage id='clear-filters' defaultMessage='Clear filters' />
    </Button>
  );
};

export { ClearFiltersButton };
