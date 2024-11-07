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
import { useEffect, useMemo, useState } from "react";
import { getMessage, getOrCreateRoom } from "../../../../store/chat/async";
import { getUserAsync } from "../../../../store/user/async";
import { io } from "socket.io-client";
import { addMessage } from "../../../../store/chat/slice";

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
  const { loading, room, allUser } = useAppSelector(
    (state) => state.chat
  );

  const messages = useAppSelector((state) => state.chat.messages);

  const socket = useMemo(() => {
    return io("http://localhost:3000");
  }, []);

  const [newMessage, setNewMessage] = useState("");

  const handleRoomChange = async (newRoomId: number) => {
    const existingRoom = Array.isArray(room)
      ? room.find((r) => r.id === newRoomId)
      : undefined;

    if (existingRoom) {
      dispatch(getMessage({ roomId: newRoomId }));
    } else if (user?.id) {
      const adminId = user.role === "ADMIN" ? user.id : newRoomId;
      const userId = user.role === "USER" ? user.id : newRoomId;

      await dispatch(getOrCreateRoom({ userId, adminId }));
    }
  };

  const currentRoomId = room[0]?.id;

  useEffect(() => {
    dispatch(getUserAsync());
  
    socket.on("chat message", (msg) => {
      console.log("New message received:", msg); // Log untuk cek pesan diterima
      if (msg.roomId === currentRoomId) {
        dispatch(addMessage(msg));
      }
    });
  
    return () => {
      socket.off("chat message");
    };
  }, [dispatch, currentRoomId]);

  const filteredUsers = Array.isArray(allUser)
    ? user?.role === "ADMIN"
      ? allUser.filter((usr) => usr.role === "USER")
      : allUser.filter((usr) => usr.role === "ADMIN")
    : [];

  useEffect(() => {
    if (currentRoomId) {
      dispatch(getMessage({ roomId: currentRoomId }));
      socket.emit("join room", currentRoomId);
    }
  }, [dispatch, currentRoomId]);

  const sendMessage = () => {
    if (newMessage.trim() && currentRoomId && user) {
      const message = {
        userId: user.id,
        roomId: currentRoomId,
        content: newMessage,
      };

      // Emit the message to the server
      socket.emit("chat message", message);

      // Reset message input
      setNewMessage("");
    }
  };

  const currentMessages = Array.isArray(messages)
    ? messages.filter((msg) => {
        return msg.roomId === currentRoomId; // Filter berdasarkan roomId
      })
    : [];

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
        <Box mt="30%">
          {filteredUsers.map((r) => (
            <Flex
              key={r.id}
              alignItems="center"
              gap={3}
              mb="20px"
              onClick={() => handleRoomChange(r.id)}
              cursor="pointer"
            >
              <Avatar size="md" name={r.name} src={r.image} />
              <Box maxW="70%">
                <Text fontSize="16px" fontWeight="bold">
                  {r.name || "Admin"}
                </Text>
                <Text fontSize="10px" color="#ABABAB" isTruncated>
                  {currentMessages.find((m) => m.senderId === r.id)?.content ||
                    "No messages yet"}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
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
          ) : Array.isArray(messages) && messages.length > 0 ? (
            messages!.map((msg) => (
              <Flex
                key={msg.id}
                align="flex-start"
                gap={2}
                justify={msg.senderId === user?.id ? "flex-end" : "flex-start"}
              >
                {msg.senderId !== user?.id && (
                  <Avatar
                    size="sm"
                    src={allUser.find((usr) => usr.id === msg.senderId)?.image}
                    name="Admin"
                  />
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
          ) : null}
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <InputRightElement>
            <Icon as={IoMdSend} color="#878787" cursor="pointer" onClick={sendMessage} />
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
}
