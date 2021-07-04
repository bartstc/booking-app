import React from 'react';
import { useTheme, ButtonProps, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Icon } from '../../Icon';
import { Button } from '../../Button';

interface IProps extends ButtonProps {
  path: string;
  isActive?: boolean;
}

const NavButton = ({ path, children, isActive = false, ...props }: IProps) => {
  const { colors } = useTheme();
  const iconColor = useColorModeValue('gray.900', 'gray.50');
  const hoverColor = useColorModeValue(colors.gray[900], colors.gray[50]);
  const hoverBg = useColorModeValue(colors.gray[200], colors.gray[600]);

  return (
    <StyledButton
      borderRadius='3px'
      w='100%'
      hoverColor={hoverColor}
      hoverBg={hoverBg}
      color={isActive ? hoverColor : iconColor}
      backgroundColor={isActive ? hoverBg : 'none'}
      variant='ghost'
      display='flex'
      justifyContent='flex-start'
      leftIcon={<Icon path={path} color={isActive ? hoverColor : iconColor} size='24px' />}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button, { shouldForwardProp: propName => !['hoverBg', 'hoverColor'].includes(propName as string) })<{
  hoverColor: string;
  hoverBg: string;
}>`
  &:hover {
    path {
      fill: ${props => `${props.hoverColor} !important`};
    }

    color: ${props => `${props.hoverColor}`};
    background-color: ${props => props.hoverBg};
  }
`;

export { NavButton };
