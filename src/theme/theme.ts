import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'black',
      },
    },
  },
  colors: {
    button: "#F74D4D"
  }
});

export default theme;
