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
import { deleteProduct, getProducts } from "../../../../store/product/async";
import { IProduct } from "../../../../types/product";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { AddProduct } from "./add-product";
import { EditProduct } from "./edit-product";

export function ProductAdmin() {
  return (
    <Box h="100vh" bg={"black"}>
      <NavbarAdmin />
      <ProductForm />
    </Box>
  );
}

export function ProductForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const dispatch = useAppDispatch();
  const toast = useToast();
  const { products, error } = useAppSelector((state) => state.product);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<IProduct| null>(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleOpenEdit = (product: IProduct) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await dispatch(deleteProduct(productToDelete.id));
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
  
  

  if (error) {
    return (
      <Text color={"white"} fontSize={"25px"} fontWeight={"bold"}>
        {error}
      </Text>
    );
  }

  return (
    <>
      <Box h={"100vh"} bg={"black"} p={9}>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <Text color={"white"} fontSize={"25px"} fontWeight={"bold"}>
            List Product
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
                <Th color={"white"}>No</Th>
                <Th color={"white"}>Photo</Th>
                <Th color={"white"}>Product Name</Th>
                <Th color={"white"}>Product Desc</Th>
                <Th color={"white"}>Price</Th>
                <Th color={"white"}>Qty</Th>
                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody bg={"#232323"}>
              {products?.map((product, index) => (
                <Tr key={product.id}>
                  <Td>{index + 1}</Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {product.image}
                  </Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {product.product_name}
                  </Td>
                  <Td
                    maxW="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {product.product_desc}
                  </Td>
                  <Td>{product.price}</Td>
                  <Td>{product.stok}</Td>
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
                      onClick={() => handleOpenEdit(product)}
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
                        setProductToDelete(product);
                        onDeleteOpen();
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
            Add Product
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProduct />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* edit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#212121"}>
          <ModalHeader color={"white"} fontWeight={"bold"}>
            Edit Product
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct && <EditProduct product={selectedProduct} />}
          </ModalBody>
          <ModalFooter></ModalFooter>
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
              onClick={handleDeleteProduct} 
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
