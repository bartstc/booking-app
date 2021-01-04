import React, { ReactNode } from 'react';
import { Flex, VStack, useTheme } from '@chakra-ui/react';
import { mdiClose, mdiMenu } from '@mdi/js';

import { IconButton } from '../Button';
import { useToggle } from '../../hooks';
import { Icon } from '../Icon';
import styled from '@emotion/styled';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  const [extended, toggle] = useToggle();
  const { colors } = useTheme();

  return (
    <Flex minH='100vh'>
      <VStack w={extended ? '280px' : '70px'} transition='all .3s ease-in-out' position='relative' backgroundColor='gray.800'>
        <DrawerIconButton
          fillColor={colors.gray[800]}
          onClick={toggle}
          title='Test icon button'
          position='absolute'
          top='16px'
          right='16px'
          icon={<Icon path={extended ? mdiClose : mdiMenu} color='white' size='32px' />}
        />
        <VStack></VStack>
      </VStack>
      {children}
    </Flex>
  );
};

const DrawerIconButton = styled(IconButton)<{ fillColor: string }>`
  &:hover {
    path {
      fill: black !important;
      transition: all 0.3s ease-in-out;
    }
  }
`;

export { Layout };
