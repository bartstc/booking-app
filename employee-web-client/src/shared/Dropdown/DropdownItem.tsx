import React, { ReactNode, MouseEvent } from 'react';
import { MenuItem, MenuItemProps } from '@chakra-ui/react';

interface IProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

type EnhancedProps = MenuItemProps & IProps;

const DropdownItem = ({ children, onClick, ...restProps }: EnhancedProps) => {
  return (
    <MenuItem
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
      }}
      fontSize='sm'
      {...restProps}
    >
      {children}
    </MenuItem>
  );
};

export { DropdownItem };
