import styled from '@emotion/styled';
import { chakra } from '@chakra-ui/react';

export const GridHeader = styled(chakra.div)`
  display: contents;

  div {
    background-color: ${props => props.bg};
    padding: 0.6rem 0;
    margin-bottom: 0.2rem;
  }
`;
