import React from 'react';
import { useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

import { Icon } from '../../Icon';
import { IconButton, IconButtonProps } from '../../Button';

interface IProps extends Omit<IconButtonProps, 'path'> {
  path: string;
}

const NavIconButton = ({ path, ...props }: IProps) => {
  const { colors } = useTheme();

  return (
    <StyledIconButton
      hoverColor={colors.gray[800]}
      icon={<Icon path={path} color='white' size={isMobile ? '24px' : '28px'} />}
      {...props}
    />
  );
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

export { NavIconButton };
