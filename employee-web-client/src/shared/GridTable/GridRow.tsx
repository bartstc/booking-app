import React, { ReactNode } from 'react';
import { chakra, ChakraProps, useTheme, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  onClick?: () => void;
}

const GridRow = ({ children, onClick, ...props }: IProps) => {
  const { colors } = useTheme();
  const cellHover = useColorModeValue(colors.gray[200], colors.gray[700]);
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  return (
    <Item display='contents' cursor='pointer' fontSize='sm' onClick={onClick} cellhover={cellHover} bordercolor={borderColor} {...props}>
      {children}
    </Item>
  );
};

const Item = styled(chakra.div)<{
  cellhover: string;
  bordercolor: string;
}>`
  .cell:first-of-type {
    padding-left: 0.65rem; // 0.75rem - first header cell
    // border-left: ${props => (props.isExpanded ? `3px solid ${props.bordercolor}` : '3px solid transparent')};
  }

  .cell:last-of-type {
    padding-right: 0.75rem;
  }

  & > .cell {
    min-height: 57px;
    align-items: center;
    padding-left: 0.5rem;
    border-bottom: ${props => `1px solid ${props.bordercolor}`};
  }

  :hover > .cell {
    transition: all 100ms ease-in-out;
    cursor: pointer;
    background-color: ${props => props.cellhover};
  }
`;

export { GridRow };
