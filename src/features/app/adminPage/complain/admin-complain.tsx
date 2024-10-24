import {
  Avatar,
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import { NavbarAdmin } from "../../../navbar/navbar-admin";

export function ComplainAdmin() {
  return (
    <Box>
      <NavbarAdmin />
      <ComplainForm />
    </Box>
  );
}

export function ComplainForm() {
  return (
    <>
      {/* side bar */}
      <Box
        position="absolute"
        top="0"
        borderRight={"1px solid #6A6A6A"}
        h={"100vh"}
        w={"25%"}
        p={4}
        overflowY="auto"
      >
        <Box mt={"40%"}>
          <Flex alignItems="center" mt={"12%"} gap={3}>
            <Avatar
              size="md"
              name="Dan Abrahmov"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdHryADrdN8DFuT4S5fqy8xyJRM1Xr8jaT6w&s"
            />
            <Box maxW={"70%"}>
              <Text fontSize={"16px"} fontWeight="bold">
                Jhonny
              </Text>
              <Text fontSize={"10px"} color={"#ABABAB"} isTruncated>
                MALAM MIN
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" mt={"12%"} gap={3}>
            <Avatar
              size="md"
              name="Dan Abrahmov"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXv6OouJS0K882nmDTdsRk-znQcyu94HdjKw-QcHU6ev8vrfg7AHACKCa45IGSWgQx2P8&usqp=CAU"
            />
            <Box maxW={"70%"}>
              <Text fontSize={"16px"} fontWeight="bold">
                Bocil Roblox
              </Text>
              <Text fontSize={"10px"} color={"#ABABAB"} isTruncated>
                BANG SKIN ROBLOX AKU MANA !!!!!!!!!
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box
        w={"75%"}
        p={4}
        ml={"25%"}
        h={"calc(100vh - 95px)"}
        display="flex"
        flexDirection="column"
      >
        <Flex direction="column-reverse" gap={4} overflowY="auto" flexGrow={1}>
          {/* Chat bubble from Admin */}
          <Flex justify="flex-end" align="flex-start" gap={3}>
            <Box
              bg="#575757" 
              color="white"
              p={3}
              borderRadius="20px"
              maxW="60%"
              boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
              textAlign="left"
            >
              <Text fontSize="14px">APA BOSSSS</Text>
            </Box>
          </Flex>

          {/* Chat bubble from User */}
          <Flex justify="flex-start" align="flex-start" gap={3}>
            <Avatar
              size="sm"
              name="Admin"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdHryADrdN8DFuT4S5fqy8xyJRM1Xr8jaT6w&s"
            />
            <Box
              bg="#262626" 
              color="white"
              p={3}
              borderRadius="20px"
              maxW="60%"
              boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
              textAlign="left"
            >
              <Text fontSize="14px">MALAM MIN</Text>
            </Box>
          </Flex>
        </Flex>

        {/* Input for sending messages */}
        <InputGroup mt={5}>
          <Input
            _placeholder={{ color: "#878787" }}
            placeholder="Send Message"
            bgColor={"#2C2C2C"}
            borderRadius="full"
            color="white"
            p={4}
          />
          <InputRightElement>
            <Icon as={IoMdSend} color="#878787" />
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
}
