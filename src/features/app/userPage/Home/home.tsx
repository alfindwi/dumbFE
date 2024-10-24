import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { Navbar } from "../../../navbar/navbar";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <Box h="100vh" bg={"black"}>
      <Navbar />
      <Card />
    </Box>
  );
}

export function Card() {
  return (
    <Box p={7}>
      <Text color="#F74D4D" fontWeight={"bold"} fontSize={"26px"}>
        Products
      </Text>
      <Flex ml={"5%"} mt={4} gap={2} wrap={"wrap"} justifyContent={"flex-start"}>
        <Box 
          bgColor={"#212121"} 
          mt={2} 
          borderRadius="md" 
          w={"250px"} 
          as={Link} 
          to="/detail"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }} 
          transition="transform 0.5s ease, box-shadow 0.2s ease" 
        >
          <Img
            src="/src/assets/kucing.jpg"
            w={"100%"}
            h={"280px"}
            objectFit={"cover"}
            borderTopRadius="md"
          />
          <Box mt={4} ml={3}>
            <Text
              mt={2}
              color={"#F74D4D"}
              fontWeight={"bold"}
              fontSize={"20px"}
              wordBreak="break-word"
            >
              Kucing
            </Text>
            <Flex mt={1} color="white" alignItems="center" justifyContent="space-between" w={"100%"}>
              <Text>Rp.500.000</Text>
              <Text fontSize={"14px"} color={"#6A6A6A"} mr={2} fontWeight={"semibold"}>
                Stok: <span>600</span>
              </Text>
            </Flex>
          </Box>
          <Button as={Link} to="/chart" mt={3} w={"90%"} mb={2} ml={3} color={"white"} bgColor={"#F74D4D"} _hover={{ bgColor: "#D63C3C" }}>
            Add to cart
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
