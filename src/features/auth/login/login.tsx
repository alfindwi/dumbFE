import { Box, Button, Flex, FormControl, Img, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function LoginForm() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="black" color="white" p={10}>
      <Box flex="1" ml={"7%"}>
        <Img src="/src/assets/logo.svg" alt="Logo" width={"30%"} />
        <Text fontSize={"45px"} mt={"30px"} color="white">
          Easy, Fast and Reliable
        </Text>
        <Box mt={4}>
          <Text color={"#6A6A6A"} fontSize={"sm"}>
            Go shopping for merchandise, just go to dumb merch
          </Text>
          <Text color={"#6A6A6A"} fontSize={"sm"}>
            shopping, the biggest merchandise in{" "}
            <span style={{ fontWeight: "bold" }}>Indonesia</span>
          </Text>
        </Box>
        <Box mt={6} gap={2} display={"flex"}>
          <Button
            padding={"5px 50px"}
            bgColor={"#F74D4D"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
          >
            Login
          </Button>
          <Button
          as={Link}
          to={"/register"}
            padding={"5px 50px"}
            bgColor={"transparent"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Bagian Kanan - Form Login */}
      <Box
        flex="1"
        maxW="400px"
        p={8}
        bg="#181818"
        borderRadius="lg"
        boxShadow="lg"
        mr={"10%"}
      >
        <Text fontSize="3xl" fontWeight={"bold"} color="white" mb={6}>
          Login
        </Text>
        <FormControl mb={5}>
          <Input type="email" padding={"25px 10px"} placeholder="Email" _placeholder={{ color: "#BCBCBC" }}  bg="#555555" border={"none"} color="white" />
        </FormControl>
        <FormControl mb={10}>
          <Input type="password" padding={"25px 10px"} placeholder="Password" _placeholder={{ color: "#BCBCBC" }}  bg="#555555" border={"none"} color="white" />
        </FormControl>
        <Button
        as={Link}
        to={"/"}
          width="full"
          padding={"25px 10px"}
          bgColor={"#F74D4D"}
          color={"white"}
          _hover={{ bgColor: "#D63C3C" }}
          fontWeight={"bold"}
        >
          Login
        </Button>
      </Box>
    </Flex>
  );
}
