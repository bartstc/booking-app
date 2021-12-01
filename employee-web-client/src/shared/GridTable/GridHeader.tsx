import styled from '@emotion/styled';
import { chakra } from '@chakra-ui/react';

export const GridHeader = styled(chakra.div)`
  display: contents;

  div:first-of-type {
    padding-left: 0;
  }

  div:first-of-type > span {
    padding-left: 0.75rem;
  }
`;
