import React from 'react';
import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react';
import { mdiAlertCircle } from '@mdi/js';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

interface IProps extends Omit<IconButtonProps, 'aria-label' | 'title'> {
  title: string;
  path?: string;
}

const IconButton = ({
  variant = 'ghost',
  colorScheme = 'gray',
  path = mdiAlertCircle,
  icon = <Icon path={path} size='26px' />,
  title,
  id,
  onClick,
  ...props
}: IProps) => {
  return (
    <Tooltip label={title}>
      <ChakraIconButton
        variant={variant}
        colorScheme={colorScheme}
        icon={icon}
        aria-label={title}
        id={id}
        data-testid={id}
        onClick={e => {
          if (onClick) {
            onClick(e);
          }
          e.stopPropagation();
          e.preventDefault();
        }}
        {...props}
      />
    </Tooltip>
  );
};

export { IconButton };
