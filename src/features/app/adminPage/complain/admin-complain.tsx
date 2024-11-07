import {
  Box
} from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbar-admin";
import { ComplainForm } from "../../userPage/Complain/complain";

export function ComplainAdmin() {
  return (
    <Box>
      <NavbarAdmin />
      <ComplainForm />
    </Box>
  );
}

// export function ComplainForm() {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.auth);
//   const { messages, loading, room, allUser } = useAppSelector(
//     (state) => state.chat
//   );

//   const [activeRoomId, setActiveRoomId] = useState<number | null>(null);

//   useEffect(() => {
//     if (activeRoomId) {
//       dispatch(getMessage({ roomId: activeRoomId }));
//     }
//   }, [dispatch, activeRoomId]);

//   const handleRoomChange = (newRoomId: number) => {
//     setActiveRoomId(newRoomId);
  
//     const existingRoom = room.find((r) => r.id === newRoomId);
  
//     // Gunakan ID admin tetap, misalnya 1, jika login sebagai admin
//     const adminId = user?.role === "ADMIN" ? user.id : newRoomId;
    
//     if (user?.id) {
//       if (existingRoom) {
//         dispatch(getMessage({ roomId: newRoomId }));
//       } else {
//         dispatch(getOrCreateRoom({ userId: newRoomId, adminId })).then((room) => {
//           if (room) {
//             setActiveRoomId(room.id);
//             dispatch(getMessage({ roomId: room.id }));
//           }
//         });
//       }
//     }
//   };
  
  
  

//   useEffect(() => {
//     dispatch(getUserAsync());
//   }, [dispatch]);


//   // Filter pengguna dengan role "admin"
//   const AllUsers = Array.isArray(allUser)
//     ? allUser.filter((usr) => usr.role === "USER")
//     : [];
//   console.log("Admin Users:", AllUsers);

//   return (
//     <>
//       {/* Sidebar */}
//       <Box
//         position="absolute"
//         top="0"
//         borderRight="1px solid #6A6A6A"
//         h="100vh"
//         w="25%"
//         zIndex={1}
//         p={4}
//         overflowY="auto"
//       >
//         <Box mt="30%">
//           {AllUsers.map((r) => (
//             <Flex
//               key={r.id}
//               alignItems="center"
//               gap={3}
//               mb="20px"
//               onClick={() => handleRoomChange(r.id)}
//               cursor="pointer"
//             >
//               <Avatar size="md" name={r.name} src={r.image} />
//               <Box maxW="70%">
//                 <Text fontSize="16px" fontWeight="bold">
//                   {r.name || "Admin"}
//                 </Text>
//                 <Text fontSize="10px" color="#ABABAB" isTruncated>
//                   {r.messages && r.messages.length > 0
//                     ? r.messages[0]?.content
//                     : "No messages yet"}
//                 </Text>
//               </Box>
//             </Flex>
//           ))}
//         </Box>
//       </Box>

//       {/* Main Chat Area */}
//       <Box
//         w="75%"
//         p={4}
//         ml="25%"
//         h="calc(100vh - 95px)"
//         display="flex"
//         flexDirection="column"
//       >
//         <Flex direction="column" gap={4} overflowY="auto" flexGrow={1}>
//           {loading ? (
//             <Text>Loading...</Text>
//           ) : (
//             messages.map((msg) => (
//               <Flex
//                 key={msg.id}
//                 align="flex-start"
//                 gap={2}
//                 justify={msg.senderId === user?.id ? "flex-end" : "flex-start"}
//               >
//                 {msg.senderId !== user?.id && (
//                   <Avatar
//                     size="sm"
//                     src={room[0]?.users?.image}
//                     name="Admin"
//                   />
//                 )}
//                 <Box
//                   bg={msg.senderId === user?.id ? "#262626" : "#575757"}
//                   color="white"
//                   p={3}
//                   borderRadius="20px"
//                   maxW="60%"
//                   boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
//                   textAlign="left"
//                 >
//                   <Text fontSize="14px">{msg.content}</Text>
//                   <Flex justify="flex-end">
//                     <Text fontSize="9px" color="#ABABAB">
//                       {new Date(msg.createdAt).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </Text>
//                   </Flex>
//                 </Box>
//                 {msg.senderId === user?.id && (
//                   <Avatar size="sm" src={user.image} />
//                 )}
//               </Flex>
//             ))
//           )}
//         </Flex>

//         {/* Input for sending messages */}
//         <InputGroup mt={5}>
//           <Input
//             _placeholder={{ color: "#878787" }}
//             placeholder="Send Message"
//             bgColor="#2C2C2C"
//             borderRadius="full"
//             color="white"
//             p={4}
//           />
//           <InputRightElement>
//             <Icon as={IoMdSend} color="#878787" cursor="pointer" />
//           </InputRightElement>
//         </InputGroup>
//       </Box>
//     </>
//   );
// }
