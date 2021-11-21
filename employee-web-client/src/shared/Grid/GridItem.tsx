import React, { ReactNode } from 'react';
import { chakra, ChakraProps, useTheme, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useCollectionStoreContextSelector } from '../Selectable/CollectionProvider';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  id: string;
  isExpanded?: boolean;
  onClick?: () => void;
}

const GridItem = ({ children, onClick, isExpanded = false, id, ...props }: IProps) => {
  const { colors } = useTheme();
  const cellHover = useColorModeValue(colors.gray[200], colors.gray[700]);
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);
  const primaryColor = useColorModeValue(colors.primary[500], colors.primary[500]);

  const includes = useCollectionStoreContextSelector(store => store.includes);
  const isSelected = includes(id);

  return (
    <Item
      id={id}
      display='contents'
      cursor='pointer'
      fontSize='sm'
      onClick={onClick}
      cellHover={cellHover}
      borderColor={borderColor}
      primaryColor={primaryColor}
      isExpanded={isExpanded}
      isSelected={isSelected}
      {...props}
    >
      {children}
    </Item>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Item = styled(chakra.div)<{ cellHover: string; borderColor: string; primaryColor: string; isExpanded: boolean; isSelected: boolean }>`
  .cell:first-of-type {
    padding-left: 0.65rem; // 0.75rem - first header cell
    border-left: ${props =>
      props.isSelected ? `3px solid ${props.primaryColor}` : `3px solid ${props.isExpanded ? `${props.borderColor}` : 'transparent'}`};
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
