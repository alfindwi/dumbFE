import { Box, Button, Flex, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { Navbar } from "../../../navbar/navbar";
import { EditProfile } from "./edit-profile";

export function Profile() {
  return (
    <Box height="100%" overflow="hidden">
      <Navbar />
      <ProfileUser />
    </Box>
  );
}

export function ProfileUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex >
      <Box ml={"20px"} width={"500px"} maxWidth={"100%"} mt={"20px"} height="100%">
        <Text color="#F74D4D" fontWeight={"bold"} fontSize={"26px"}>
          My Profile
        </Text>
        <Flex ml={"2%"} mt={4} gap={2} wrap={"wrap"} justifyContent={"flex-start"} height="100%">
          <Flex>
            <Box mt={2} w={"250px"}>
              <Img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdHryADrdN8DFuT4S5fqy8xyJRM1Xr8jaT6w&s"
                w={"500px"}
                h={"340px"}
                objectFit={"cover"}
                borderTopRadius="md"
              />
              <Button
                mt={1}
                w={"250px"}
                bgColor={"#F74D4D"}
                color={"white"}
                _hover={{ bgColor: "#D63C3C" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Box>
            <Box mt={2} ml={5} maxW={"300px"}>
              <Box mb={3}>
                <Text color={"#F74D4D"} fontWeight={"bold"} fontSize={"20px"}>
                  Name
                </Text>
                <Text color={"white"} fontSize={"15px"}>
                  Jhonny
                </Text>
              </Box>
              <Box mb={3}>
                <Text color={"#F74D4D"} fontWeight={"bold"} fontSize={"20px"}>
                  Email
                </Text>
                <Text color={"white"} fontSize={"15px"}>
                  JhonnyWick@gmail.com
                </Text>
              </Box>
              <Box mb={3}>
                <Text color={"#F74D4D"} fontWeight={"bold"} fontSize={"20px"}>
                  Phone
                </Text>
                <Text color={"white"} fontSize={"15px"}>
                  0899999991
                </Text>
              </Box>
              <Box mb={3}>
                <Text color={"#F74D4D"} fontWeight={"bold"} fontSize={"20px"}>
                  Gender
                </Text>
                <Text color={"white"} fontSize={"15px"}>
                  Male
                </Text>
              </Box>
              <Box>
                <Text color={"#F74D4D"} fontWeight={"bold"} fontSize={"20px"}>
                  Address
                </Text>
                <Text color={"white"} fontSize={"15px"}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus omnis deleniti eveniet perspiciatis culpa adipisci optio odio fuga natus sunt.
                </Text>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box ml={"10px"} maxW={"100%"} mt={"20px"} height="100%">
        <Text color="#F74D4D" fontWeight={"bold"} fontSize={"26px"}>
          My Transaction
        </Text>
        <Flex>
          <Box bg={"#212121"} height={"190px"} w={"100%"} mt={4} p={3}>
            <Flex height="100%">
              <Img
                w={"120px"}
                h={"160px"}
                padding={"10px"}
                src="https://row.hyperx.com/cdn/shop/products/hyperx_alloy_core_rgb_es_1_top_down_1600x.jpg?v=1664011586"
                objectFit={"cover"}
              />
              <Box ml={2} mt={3}>
                <Text color="#F74D4D" fontWeight="bold" fontSize="16px">
                  Mouse
                </Text>
                <Text color="#F74D4D" fontSize="12px" fontWeight="light">
                  <span style={{ fontWeight: "semibold" }}>Saturday</span>, 3 March 2022
                </Text>
                <Text color="white" fontSize="12px" mt={2}>
                  Price : Rp.500.000
                </Text>
                <Text color="white" fontSize="15px" mt={"30%"} fontWeight={"bold"}>
                  Sub Total: Rp.500.000
                </Text>
              </Box>
              <Box textAlign={"center"} mt={"50px"} ml={"260px"}>
                <Img w={"100%"} h={"70px"} src="/src/assets/logo.svg" />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#212121"}>
          <ModalHeader color={"#F74D4D"} fontWeight={"bold"}>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProfile />
          </ModalBody>
          <ModalFooter>
            <Button bg={"#F74D4D"} _hover={{ bg: "#D63C3C" }} mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
