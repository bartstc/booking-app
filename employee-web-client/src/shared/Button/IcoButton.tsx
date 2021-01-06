import React from 'react';
import { IconButton as ChakraIconButton, IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';
import { mdiAlertCircle } from '@mdi/js';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

export interface IconButtonProps extends Omit<ChakraIconButtonProps, 'aria-label' | 'title'> {
  title: string;
  path?: string;
  withoutTooltip?: boolean;
}

const IconButton = ({
  variant = 'ghost',
  colorScheme = 'gray',
  path = mdiAlertCircle,
  icon = <Icon path={path} size='26px' />,
  title,
  id,
  onClick,
  withoutTooltip = false,
  ...props
}: IconButtonProps) => {
  return (
    <Tooltip label={withoutTooltip ? '' : title}>
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
