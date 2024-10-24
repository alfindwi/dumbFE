import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {

   return (
      <Stack>
         <Box>
            <Outlet />
         </Box>
      </Stack>
   );
};

export default RootLayout;
