import {
  Box,
  Flex,
  Icon,
  Img,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { TbArrowBack } from "react-icons/tb";

export function ErrorRoute() {
  return (
    <Box
      bg="white"
      color="#e0e2f4"
      display="flex"
      h={"100vh"}
      justifyContent={"center"}
    >
      <VStack>
        <Text fontSize="6xl" color={"black"} fontWeight={"bold"}>
          Opps!
        </Text>
        <Text fontSize="2xl" color={"black"} fontWeight={"bold"}>
          You are lost
        </Text>
        <Img
          mt={10}
          src="https://res.cloudinary.com/db2rr1kej/image/upload/v1736481324/DumbMerch/m1hvyjnvilwavywzfan6.png"
          w={"600px"}
        />
        <Link
          href="/"
          mt={10}
          _hover={{ textDecoration: "none" }}
          display="inline-block"
          position="relative"
          _after={{
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "2px",
            backgroundColor: "black",
          }}
        >
          <Flex align="center">
            <Icon as={TbArrowBack} boxSize={5} mr={2} color="black" />
            <Text
              fontSize="xl"
              color="black"
              fontWeight="bold"
              cursor="pointer"
            >
              Go back home
            </Text>
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
}
