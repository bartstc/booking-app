import React, { ReactNode } from 'react';
import { useBreakpointValue, useColorModeValue, chakra, ChakraProps } from '@chakra-ui/react';
import { Link, useRouteMatch } from 'react-router-dom';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  to: string;
}

const TabLink = ({ children, to, ...props }: IProps) => {
  const { path } = useRouteMatch();

  const tabFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const borderColor = useColorModeValue('transparent', 'transparent');
  const activeColor = useColorModeValue('primary.500', 'primary.300');
  const defaultColor = useColorModeValue('gray.700', 'white');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const StyledTab = chakra('button', { themeKey: 'Tabs.Tab' } as any);

  return (
    <Link to={to}>
      <StyledTab
        fontSize={tabFontSize}
        border='2px'
        borderColor={to.includes(path) ? borderColor : 'transparent'}
        borderBottomColor={to.includes(path) ? activeColor : 'transparent'}
        color={to.includes(path) ? activeColor : defaultColor}
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
