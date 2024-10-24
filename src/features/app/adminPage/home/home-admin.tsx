import { Box, Text } from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbar-admin";

export function HomeAdmin() {
  return (
    <Box h="100vh" bg={"black"}>
      <NavbarAdmin />
      <DashboardContent />
    </Box>
  );
}

const DashboardContent = () => (
  <Box p={6} bg="#232323" color="white" flexGrow={1}>
    <Text fontSize="2xl" mb={4}>Dashboard Overview</Text>
    <Text>This is where you can display key metrics, charts, or tables.</Text>
  </Box>
);
