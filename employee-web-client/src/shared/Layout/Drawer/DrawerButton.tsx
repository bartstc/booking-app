import React from 'react';
import { Text, useTheme, ButtonProps } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Icon } from '../../Icon';
import { Button } from '../../Button';

interface IProps extends ButtonProps {
  path: string;
}

const DrawerButton = ({ path, children, ...props }: IProps) => {
  const { colors } = useTheme();

  return (
    <StyledButton
      hoverColor={colors.gray[800]}
      color='white'
      variant='ghost'
      leftIcon={<Icon path={path} color='white' size='32px' />}
      {...props}
    >
      <Text pl={2} fontWeight='700' fontSize='xl'>
        {children}
      </Text>
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

export { DrawerButton };
