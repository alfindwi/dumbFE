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
import { Navbar } from "../../../navbar/navbar";
import { IoMdSend } from "react-icons/io";

export function Complain() {
  return (
    <Box>
      <Navbar />
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
        zIndex={1}
        p={4}
        overflowY="auto"
      >
        <Flex alignItems="center" mt={"40%"} gap={3}>
          <Avatar size="md" name="Dan Abrahmov" src="/src/assets/kucing.jpg" />
          <Box maxW={"70%"}>
            <Text fontSize={"16px"} fontWeight="bold">
              Admin
            </Text>
            <Text fontSize={"10px"} color={"#ABABAB"} isTruncated>
              apa woi dwodwodbqoudbqoudbqwdouqwbddwdwdwdqdqdwqdwqdwqdwqdq
            </Text>
          </Box>
        </Flex>
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
          {/* Chat bubble from admin */}
          <Flex align="flex-start" gap={3}>
            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="/src/assets/kucing.jpg"
            />
            <Box
              bg="#575757"
              color="white"
              p={3}
              borderRadius="20px"
              maxW="60%"
              boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
              textAlign="left"
            >
              <Text fontSize="14px">
                APA BOSSSS
              </Text>
            </Box>
          </Flex>

          {/* Chat bubble from user */}
          <Flex justify="flex-end" align="flex-start" gap={3}>
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
