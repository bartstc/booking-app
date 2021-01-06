import React from 'react';
import { useTheme, ButtonProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

import { Icon } from '../../Icon';
import { Button } from '../../Button';

interface IProps extends ButtonProps {
  path: string;
}

const NavButton = ({ path, children, ...props }: IProps) => {
  const { colors } = useTheme();

  return (
    <StyledButton
      hoverColor={colors.gray[800]}
      color='white'
      variant='ghost'
      leftIcon={<Icon path={path} color='white' size={isMobile ? '24px' : '32px'} />}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)<{ hoverColor: string }>`
  &:hover {
    path {
      fill: ${props => `${props.hoverColor} !important`};
    }

    color: ${props => `${props.hoverColor}`};
    background-color: white;
  }
`;

export { NavButton };
