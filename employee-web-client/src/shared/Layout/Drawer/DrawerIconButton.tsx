import React from 'react';
import { useTheme, IconButtonProps } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Icon } from '../../Icon';
import { IconButton } from '../../Button';

interface IProps extends Omit<IconButtonProps, 'aria-label'> {
  title: string;
  path: string;
}

const DrawerIconButton = ({ path, ...props }: IProps) => {
  const { colors } = useTheme();

  return <StyledIconButton hoverColor={colors.gray[800]} icon={<Icon path={path} color='white' size='32px' />} {...props} />;
};

const StyledIconButton = styled(IconButton)<{ hoverColor: string }>`
  &:hover {
    path {
      fill: ${props => `${props.hoverColor} !important`};
      transition: all 0.3s ease-in-out;
    }

    background-color: white;
  }
`;

export { DrawerIconButton };
