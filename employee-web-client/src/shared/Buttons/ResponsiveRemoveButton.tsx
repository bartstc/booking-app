import React from 'react';
import { isMobile } from 'react-device-detect';
import { mdiDelete } from '@mdi/js';
import { useIntl } from 'react-intl';
import { ChakraProps } from '@chakra-ui/react';

import { IconButton, Button } from 'shared/Button';
import { Icon } from 'shared/Icon';

interface IProps extends ChakraProps {
  onClick: () => void;
}

const ResponsiveRemoveButton = ({ onClick, ...props }: IProps) => {
  const { formatMessage } = useIntl();

  if (isMobile) {
    return (
      <IconButton
        title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
        colorScheme='red'
        path={mdiDelete}
        onClick={onClick}
        {...props}
      />
    );
  }

  return (
    <Button colorScheme='red' variant='ghost' onClick={onClick} leftIcon={<Icon path={mdiDelete} />} {...props}>
      {formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
    </Button>
  );
};

export { ResponsiveRemoveButton };
