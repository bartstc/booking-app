import React, { ReactNode } from 'react';
import { chakra, ChakraProps, useTheme, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  onClick?: () => void;
}

const GridItem = ({ children, onClick, ...props }: IProps) => {
  const { colors } = useTheme();
  const cellHover = useColorModeValue(colors.gray[200], colors.gray[700]);
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  return (
    <Item display='contents' cursor='pointer' fontSize='sm' onClick={onClick} cellHover={cellHover} borderColor={borderColor} {...props}>
      {children}
    </Item>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Item = styled(chakra.div)<{ cellHover: string; borderColor: string }>`
  .cell:first-of-type {
    padding-left: 0.75rem;
  }

  .cell:last-of-type {
    padding-right: 0.75rem;
  }

  & > .cell {
    min-height: 57px;
    align-items: center;
    padding-left: 0.5rem;
    border-bottom: ${props => `1px solid ${props.borderColor}`};
  }

  :hover > .cell {
    transition: all 100ms ease-in-out;
    cursor: pointer;
    background-color: ${props => props.cellHover};
  }
`;

export { GridItem };
