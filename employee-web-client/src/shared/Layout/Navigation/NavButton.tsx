import React from 'react';
import { useTheme, ButtonProps, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

import { Icon } from '../../Icon';
import { Button } from '../../Button';

interface IProps extends ButtonProps {
  path: string;
}

const NavButton = ({ path, children, ...props }: IProps) => {
  const { colors } = useTheme();
  const iconColor = useColorModeValue('gray.700', 'white');
  const hoverColor = useColorModeValue(colors.gray[50], colors.gray[800]);
  const hoverBg = useColorModeValue(colors.gray[700], 'white');

  return (
    <StyledButton
      hoverColor={hoverColor}
      hoverBg={hoverBg}
      color={iconColor}
      variant='ghost'
      leftIcon={<Icon path={path} color={iconColor} size={isMobile ? '24px' : '28px'} />}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)<{ hoverColor: string; hoverBg: string }>`
  &:hover {
    path {
      fill: ${props => `${props.hoverColor} !important`};
    }

    color: ${props => `${props.hoverColor}`};
    background-color: ${props => props.hoverBg};
  }
`;

export { NavButton };
