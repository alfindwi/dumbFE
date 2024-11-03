import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbar-admin";

export function TransactionAdmin() {
  return (
    <Box h="100vh" bg={"black"}>
      <NavbarAdmin />
      <TransactionForm />
    </Box>
  );
}


export function TransactionForm() {

  return (
    <>
      <Box h={"100vh"} bg={"black"} p={9}>
          <Text color={"white"} mb={5} fontSize={"25px"} fontWeight={"bold"}>
            Transaction Order
          </Text>
        <TableContainer>
          <Table size="sm">
            <Thead bg={"#303030"}>
              <Tr>
                <Th color={"white"}>Transaction Id</Th>
                <Th color={"white"}>Customer Name</Th>
                <Th color={"white"}>Product Name</Th>
                <Th color={"white"}>Total Price</Th>
                <Th color={"white"}>Payment Status</Th>
              </Tr>
            </Thead>
            <Tbody bg={"#232323"}>
                <Tr>
                  <Td>{1}</Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    alvin dwi 
                  </Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    Morfem x Teenage Death Star - Makan Tuh Skill
                  </Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    Rp. 200.000
                  </Td>
                  <Td>PENDING</Td>
                </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
