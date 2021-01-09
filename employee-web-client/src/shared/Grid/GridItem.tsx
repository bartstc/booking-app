import React, { ReactNode } from 'react';
import { chakra, ChakraProps, useTheme, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  onClick?: () => void;
}

const GridItem = ({ children, onClick, ...props }: IProps) => {
  const { colors } = useTheme();
  const cellBackground = useColorModeValue(colors.gray[50], colors.gray[700]);
  const cellHover = useColorModeValue(colors.primary[100], colors.gray[600]);

  return (
    <Item
      display='contents'
      cursor='pointer'
      onClick={onClick}
      colors={colors}
      cellBackground={cellBackground}
      cellHover={cellHover}
      {...props}
    >
      {children}
    </Item>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Item = styled(chakra.div)<{ colors: any; cellBackground: string; cellHover: string }>`
  .cell:first-of-type {
    padding-left: 1rem;
    font-size: 0.85rem;
  }

  .cell:last-of-type {
    padding-right: 1rem;
  }

  & > .cell {
    background-color: ${props => props.cellBackground};
    min-height: 42px;
    display: flex;
    align-items: center;
  }

  :hover > .cell {
    transition: all 100ms ease-in-out;
    cursor: pointer;
    background-color: ${props => props.cellHover};
  }
`;

export { GridItem };
