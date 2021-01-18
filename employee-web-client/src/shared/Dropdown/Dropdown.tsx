import React, { Children, ReactNode } from 'react';
import { Menu, MenuButton, MenuList, Center, useColorModeValue, IconButton } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { mdiDotsVertical } from '@mdi/js';

import { PlacementType } from './PlacementType';
import { Icon } from '../Icon';

interface IProps {
  children: ReactNode;
  placement?: PlacementType;
}

const Dropdown = ({ placement = PlacementType.BOTTOM_END, children }: IProps) => {
  const { formatMessage } = useIntl();
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bg = useColorModeValue('white', 'gray.700');
  const iconColor = useColorModeValue('gray.700', 'gray.100');

  const count = Children.toArray(children).length;

  if (count === 0) {
    return null;
  }

  return (
    <Menu autoSelect={false} placement={placement}>
      <MenuButton
        as={IconButton}
        aria-label={formatMessage({
          id: 'aria-label-more-actions',
          defaultMessage: 'More options',
        })}
        title={formatMessage({
          id: 'aria-label-more-actions',
          defaultMessage: 'More options',
        })}
        onClick={e => {
          e.stopPropagation();
        }}
        background='none'
      >
        <Center>
          <Icon path={mdiDotsVertical} color={iconColor} size='24px' />
        </Center>
      </MenuButton>
      <MenuList mt='-20px' borderColor={borderColor} bg={bg}>
        {children}
      </MenuList>
    </Menu>
  );
};

export { Dropdown };
