import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getTransaction } from "../../../../store/transaction/async";
import { useEffect } from "react";

export function TransactionAdmin() {
  return (
    <Box h="100vh" bg={"black"}>
      <NavbarAdmin />
      <TransactionForm />
    </Box>
  );
}

export function TransactionForm() {
  const dipatch = useAppDispatch();

  const { order } = useAppSelector((state) => state.transaction);

  useEffect(() => {
    dipatch(getTransaction());
  }, [dipatch]);

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
            {order.map((item, index) => (
              <Tbody bg={"#232323"}>
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.user.name}
                  </Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.OrderItems.map((item) => item.product.product_name)}
                  </Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.totalAmount}
                  </Td>
                  <Td>{item.status}</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
