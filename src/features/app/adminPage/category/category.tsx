import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { EditCategory } from "./edit-category";

export function CategoryAdmin() {
  return (
    <Box h="100vh" bg={"black"}>
      <NavbarAdmin />
      <CategoryForm />
    </Box>
  );
}

export function CategoryForm() {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <>
      <Box h={"100vh"} bg={"black"} p={9}>
        <Text color={"white"} fontSize={"25px"} fontWeight={"bold"}>
          List Product
        </Text>
        <TableContainer>
          <Table size="sm">
            <Thead bg={"#303030"}>
              <Tr>
                <Th color={"white"}>No Product</Th>
                <Th color={"white"}>Category Name</Th>
                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody bg={"#232323"}>
              <Tr>
                <Td>1</Td>
                <Td>MOUSE</Td>
                <Td>
                  <Button
                    size={"sm"}
                    bgColor={"#56C05A"}
                    color={"white"}
                    width={"40%"}
                    borderRadius={"md"}
                    _hover={{ bgColor: "#4cd94c" }}
                    _active={{ bgColor: "#3f963f" }}
                    boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
                    mr={2}
                    mt={2}
                    mb={2}
                    fontWeight={"bold"}
                    onClick={onEditOpen}
                  >
                    Edit
                  </Button>
                  <Button
                    size={"sm"}
                    bgColor={"#F74D4D"}
                    color={"white"}
                    borderRadius={"md"}
                    width={"40%"}
                    _hover={{ bgColor: "#FF6B6B" }}
                    _active={{ bgColor: "#C62C2C" }}
                    boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
                    mb={2}
                    mt={2}
                    fontWeight={"bold"}
                    onClick={onDeleteOpen}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* edit  */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#212121"}>
          <ModalHeader color={"white"} fontWeight={"bold"}>
            Edit Category
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditCategory />
          </ModalBody>
          <ModalFooter>
            <Button bg={"#F74D4D"} _hover={{ bg: "#D63C3C" }} mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* delete */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#212121"}>
          <ModalHeader color={"white"} fontWeight={"bold"}>
            Delete Data
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={"white"}>
              Are you sure you want to delete this data?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"#56C05A"}
              _hover={{ bg: "#4cd94c" }}
              mr={3}
              width={"100px"}
            >
              Yes
            </Button>
            <Button
              bg={"#F74D4D"}
              width={"100px"}
              _hover={{ bg: "#D63C3C" }}
              onClick={onDeleteClose}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
