import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Lato',
    body: 'Lato',
  },
  colors: {
    primary: {
      // https://maketintsandshades.com/#ffa500
      50: '#ffedcc',
      100: '#ffdb99',
      200: '#ffc966',
      300: '#ffc04d',
      400: '#ffb733',
      500: '#ffa500',
      600: '#e69500',
      700: '#cc8400',
      800: '#b37300',
      900: '#805300',
    },
  },
});
