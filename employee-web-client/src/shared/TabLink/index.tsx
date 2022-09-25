import React, { ReactNode } from 'react';
import { useBreakpointValue, useColorModeValue, chakra, ChakraProps } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  to: string;
  isActive?: boolean;
}

const TabLink = ({ children, to, isActive, ...props }: IProps) => {
  const { pathname } = useLocation();

  const tabFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const borderColor = useColorModeValue('transparent', 'transparent');
  const activeColor = useColorModeValue('primary.500', 'primary.300');
  const defaultColor = useColorModeValue('gray.700', 'white');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const StyledTab = chakra('button', { themeKey: 'Tabs.Tab' } as any);

  const active = isActive ?? to.includes(pathname);

  return (
    <Link to={to}>
      <StyledTab
        fontSize={tabFontSize}
        border='2px'
        borderColor={active ? borderColor : 'transparent'}
        borderBottomColor={active ? activeColor : 'transparent'}
        color={active ? activeColor : defaultColor}
        textAlign='center'
        cursor='pointer'
        px='1.3rem'
        py='.75rem'
        transition='all 0.2s'
        w='100%'
        mb='-2px'
        {...props}
      >
        {children}
      </StyledTab>
    </Link>
  );
};

export { TabLink };
