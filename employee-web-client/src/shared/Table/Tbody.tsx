import React from 'react';
import { Tbody as ChakraTbody, TableBodyProps, useTheme, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface IProps extends TableBodyProps {}

const Tbody = ({ children, ...props }: IProps) => {
  const { colors } = useTheme();
  const cellHover = useColorModeValue(colors.gray[200], colors.gray[700]);

  return (
    <StyledTbody {...props} cellhover={cellHover}>
      {children}
    </StyledTbody>
  );
};

const StyledTbody = styled(ChakraTbody)<{
  cellhover: string;
}>`
  tr:hover {
    transition: all 100ms ease-in-out;
    background-color: ${props => props.cellhover};
  }
`;

export { Tbody };
