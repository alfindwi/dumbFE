import {
  Box,
  Button,
  Flex,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { Navbar } from "../../../navbar/navbar";
import { EditProfile } from "./edit-profile";
import { useEffect } from "react";
import { getOrder } from "../../../../store/order/async";

export function Profile() {
  return (
    <Box height="100%" overflow="hidden">
      <Navbar />
      <ProfileUser />
    </Box>
  );
}

export function ProfileUser() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <Flex>
      <Box ml="20px" width="500px" maxWidth="100%" mt="20px" height="100%">
        <Text color="#F74D4D" fontWeight="bold" fontSize="26px">
          My Profile
        </Text>
        <Flex
          ml="2%"
          mt={4}
          gap={2}
          wrap="wrap"
          justifyContent="flex-start"
          height="100%"
        >
          <Flex>
            <Box mt={2} w="250px">
              <Img
                src={user?.image}
                w="500px"
                h="340px"
                objectFit="cover"
                borderTopRadius="md"
              />
              <Button
                mt={1}
                w="250px"
                bgColor="#F74D4D"
                color="white"
                _hover={{ bgColor: "#D63C3C" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Box>
            <Box mt={2} ml={5} maxW="300px">
              <Box mb={3}>
                <Text color="#F74D4D" fontWeight="bold" fontSize="20px">
                  Name
                </Text>
                <Text color="white" fontSize="15px">
                  {user?.name || "No name available"}
                </Text>
              </Box>
              <Box mb={3}>
                <Text color="#F74D4D" fontWeight="bold" fontSize="20px">
                  Email
                </Text>
                <Text color="white" fontSize="15px">
                  {user?.email || "No email available"}
                </Text>
              </Box>
              <Box mb={3}>
                <Text color="#F74D4D" fontWeight="bold" fontSize="20px">
                  Phone
                </Text>
                <Text color="white" fontSize="15px">
                  {user?.phone || "No phone number provided"}
                </Text>
              </Box>
              <Box mb={3}>
                <Text color="#F74D4D" fontWeight="bold" fontSize="20px">
                  Gender
                </Text>
                <Text color="white" fontSize="15px">
                  {user?.gender || "No gender provided"}
                </Text>
              </Box>
              <Box>
                <Text color="#F74D4D" fontWeight="bold" fontSize="20px">
                  Address
                </Text>
                <Text color="white" fontSize="15px">
                  {user?.address || "No address provided"}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box ml="100px" maxW="100%" mt="20px" height="100%">
        <Text color="#F74D4D" fontWeight="bold" fontSize="26px">
          My Transaction
        </Text>
        {orders.map((order) => (
          <Flex>
            <Box bg="#212121" height="100%" borderRadius="md" w="600px" maxW={"600px"} mt={4} p={3}>
              <Flex height="100%" alignItems="center">
                <Img
                  w="120px"
                  h="160px"
                  padding="10px"
                  src={order.OrderItems[0].product.image}
                  objectFit="cover"
                />
                <Box ml={4} mt={3} flex="1">
                  <Text color="#F74D4D" fontWeight="bold" fontSize="16px" maxW={"400px"}>
                    {order.OrderItems[0].product.product_name}
                  </Text>
                  <Text color="#F74D4D" fontSize="12px" fontWeight="light">
                    {new Date(order.createdAt).toDateString()}
                  </Text>
                  <Text color="white" fontSize="12px" mt={2}>
                    Price: Rp. {order.OrderItems[0].product.price}
                  </Text>
                  <Text color="white" fontSize="15px" mt={2} fontWeight="bold">
                    Sub Total: Rp. {order.totalAmount}
                  </Text>
                </Box>
                <Box textAlign="center" mt={2}>
                  <Img w="100%" h="70px" src="/src/assets/logo.svg" />
                </Box>
              </Flex>
            </Box>
          </Flex>
        ))}
      </Box>

      {/* Edit Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#212121">
          <ModalHeader color="#F74D4D" fontWeight="bold">
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProfile />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
