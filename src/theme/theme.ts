import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "black",
        scrollbarWidth: "none",
        '-ms-overflow-style': 'none'
      },
      '::-webkit-scrollbar': {
        display: 'none'
      }
    },
  },
  colors: {
    button: "#F74D4D",
  },
  fonts: {
    body: "Kanit",
    heading: "Kanit",
  },
  
});

export default theme;
