import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  colors: {
    primary: {
      // https://maketintsandshades.com/#ffa500
      50: '#f2ecf9',
      100: '#d7c6ec',
      200: '#bc9fdf',
      300: '#a179d3',
      400: '#8653c6',
      500: '#6d39ac',
      600: '#552c86',
      700: '#3d2060',
      800: '#241339',
      900: '#0c0613',
    },
  },
});
