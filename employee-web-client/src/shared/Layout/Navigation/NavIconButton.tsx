import React from 'react';
import { useTheme, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

import { Icon } from '../../Icon';
import { IconButton, IconButtonProps } from '../../Button';

interface IProps extends Omit<IconButtonProps, 'path'> {
  path: string;
}

const NavIconButton = ({ path, ...props }: IProps) => {
  const { colors } = useTheme();
  const iconColor = useColorModeValue('gray.700', 'white');
  const hoverColor = useColorModeValue(colors.gray[50], colors.gray[800]);
  const hoverBg = useColorModeValue(colors.gray[700], 'white');

  return (
    <StyledIconButton
      hoverColor={hoverColor}
      hoverBg={hoverBg}
      icon={<Icon path={path} color={iconColor} size={isMobile ? '24px' : '28px'} />}
      {...props}
    />
  );
};

const StyledIconButton = styled(IconButton)<{ hoverColor: string; hoverBg: string }>`
  &:hover {
    path {
      fill: ${props => `${props.hoverColor} !important`};
      transition: all 0.3s ease-in-out;
    }

    background-color: ${props => props.hoverBg};
  }
`;

export { NavIconButton };
