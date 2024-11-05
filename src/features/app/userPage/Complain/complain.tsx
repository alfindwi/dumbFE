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
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect } from "react";
import { getMessage } from "../../../../store/chat/async";

export function Complain() {
  return (
    <Box>
      <Navbar />
      <ComplainForm />
    </Box>
  );
}

export function ComplainForm() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { messages, loading } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getMessage({ roomId: 3 })); // Menyesuaikan roomId
  }, [dispatch]);

    
  return (
    <>
      {/* Sidebar */}
      <Box
        position="absolute"
        top="0"
        borderRight="1px solid #6A6A6A"
        h="100vh"
        w="25%"
        zIndex={1}
        p={4}
        overflowY="auto"
      >
        <Flex alignItems="center" mt="40%" gap={3}>
          <Avatar size="md" name="Admin" src="/src/assets/kucing.jpg" />
          <Box maxW="70%">
            <Text fontSize="16px" fontWeight="bold">
              Admin
            </Text>
            <Text fontSize="10px" color="#ABABAB" isTruncated>
              apa woi dwodwodbqoudbqoudbqwdouqwbddwdwdwdqdqdwqdwqdwqdwqdq
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Main Chat Area */}
      <Box
        w="75%"
        p={4}
        ml="25%"
        h="calc(100vh - 95px)"
        display="flex"
        flexDirection="column"
      >
        <Flex direction="column" gap={4} overflowY="auto" flexGrow={1}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            messages.map((msg) => (
              <Flex
                key={msg.id}
                align="flex-start"
                gap={2} // kurangi gap untuk mendekatkan avatar dan bubble
                justify={msg.senderId === user?.id ? "flex-end" : "flex-start"}
              >
                {msg.senderId !== user?.id && (
                  <Avatar size="sm" src="/src/assets/kucing.jpg" name="Admin" />
                )}
                <Box
                  bg={msg.senderId === user?.id ? "#262626" : "#575757"}
                  color="white"
                  p={3}
                  borderRadius="20px"
                  maxW="60%"
                  boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
                  textAlign="left"
                >
                  <Text fontSize="14px">{msg.content}</Text>
                  <Flex justify="flex-end">
                    <Text fontSize="9px" color="#ABABAB">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Flex>
                </Box>
                {msg.senderId === user?.id && (
                  <Avatar size="sm" src={user.image} />
                )}
              </Flex>
            ))
          )}
        </Flex>

        {/* Input for sending messages */}
        <InputGroup mt={5}>
          <Input
            _placeholder={{ color: "#878787" }}
            placeholder="Send Message"
            bgColor="#2C2C2C"
            borderRadius="full"
            color="white"
            p={4}
          />
          <InputRightElement>
            <Icon as={IoMdSend} color="#878787" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
}