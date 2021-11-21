import React from 'react';
import { useIntl } from 'react-intl';
import { Input, InputGroup, InputLeftElement, InputRightElement, InputProps } from '@chakra-ui/react';
import { mdiClose, mdiMagnify } from '@mdi/js';

import { useFilterInput } from './useFilterInput';
import { IconButton } from '../Button';
import { Icon } from '../Icon';

interface IProps extends InputProps {
  filterName?: string;
}

const FiltersInput = ({ filterName = 'query', ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { onChange, value } = useFilterInput(filterName, undefined);

  return (
    <InputGroup maxW='370px'>
      <InputLeftElement pointerEvents='none'>
        <div>
          <Icon path={mdiMagnify} color='gray.500' size='26px' />
        </div>
      </InputLeftElement>
      <Input onChange={e => onChange(e.target.value)} value={value} {...props} />
      <InputRightElement>
        <IconButton
          display={value ? 'block' : 'none'}
          size='sm'
          icon={<Icon path={mdiClose} color='gray.500' />}
          title={formatMessage({ id: 'clear', defaultMessage: 'Clear' })}
          onClick={() => onChange('')}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export { FiltersInput };
