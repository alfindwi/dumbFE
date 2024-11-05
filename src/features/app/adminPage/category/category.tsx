import {
  Box,
  Button,
  Flex,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { deleteCategory, getCategory } from "../../../../store/category/async";
import { ICategory } from "../../../../types/category";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { AddCategory } from "./add-category";
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
  const dispatch = useAppDispatch();
  const toast = useToast();
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
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const { category } = useAppSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory| null>(null);

  
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await dispatch(deleteCategory(categoryToDelete.id));
        toast({
          title: "Product deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onDeleteClose();
      } catch (error) {
        toast({
          title: "Failed to delete product",
          description: (error as Error).message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Box h={"100vh"} bg={"black"} p={9}>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <Text color={"white"} fontSize={"25px"} fontWeight={"bold"}>
            List Category
          </Text>
          <Button
            size="sm"
            bgColor="#56C05A"
            color="white"
            fontWeight={"bold"}
            _hover={{ bgColor: "#4cd94c" }}
            _active={{ bgColor: "#3f963f" }}
            onClick={onAddOpen}
          >
            Add Product
          </Button>
        </Flex>
        <TableContainer>
          <Table size="sm">
            <Thead bg={"#303030"}>
              <Tr>
                <Th color={"white"}>No Category</Th>
                <Th color={"white"}>Category Name</Th>
                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody bg={"#232323"}>
              {category && category?.map((categoryItem, index) => (
                <Tr key={categoryItem.id}>
                  <Td>{index + 1}</Td>
                  <Td>{categoryItem.name}</Td>
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
                      onClick={() => {
                        onEditOpen();
                        setSelectedCategory(categoryItem);                        
                      }}
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
                      onClick={() => {
                        onDeleteOpen();
                        setCategoryToDelete(categoryItem);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* add */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#212121"}>
          <ModalHeader color={"white"} fontWeight={"bold"}>
            Add Category
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCategory />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* edit  */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#212121"}>
          <ModalHeader color={"white"} fontWeight={"bold"}>
            Edit Category
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCategory && <EditCategory category={selectedCategory} />}
          </ModalBody>
          <ModalFooter>
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
              onClick={handleDeleteCategory}
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
