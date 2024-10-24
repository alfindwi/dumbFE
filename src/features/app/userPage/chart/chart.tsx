import { Box, Button, Divider, Flex, Img, Text } from "@chakra-ui/react";
import { Navbar } from "../../../navbar/navbar";

export function Chart() {
  return (
    <Box>
      <Navbar />
      <ChartForm />
    </Box>
  );
}

export function ChartForm() {
  return (
    <Box>
      <Text
        color={"#F74D4D"}
        ml={"5%"}
        mt={"2%"}
        fontWeight={"bold"}
        fontSize={"25px"}
      >
        Shopping Cart
      </Text>
      <Box
        bg={"#212121"}
        mt={"3%"}
        ml={"5%"}
        mr={"5%"}
        maxW={"90%"}
        borderRadius={"md"}
      >
        {/* shopping cart */}
        <Flex p={3}>
          <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpit8EH6gd598D8GYqVtn1H-28dW51RT_lEA&s" w={"150px"} />
          <Box ml={2} w={"40%"}>
            <Text color={"#F74D4D"} fontWeight={"bold"} fontSize={"24px"}>
              Kucing
            </Text>
            <Text color={"white"} mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
              non quibusdam inventore necessitatibus architecto sapiente sed
              voluptatibus voluptate vel libero.
            </Text>
          </Box>
          <Box ml={"auto"}>
            <Text
              mt={3}
              ml={2}
              color={"white"}
              fontWeight={"bold"}
              fontSize={"20px"}
            >
              Rp.500.000
            </Text>
            <Box display="flex" mt={9} alignItems="center">
              <Button
                size="sm"
                bg="#F74D4D"
                color="white"
                _hover={{ bg: "#C63C3C" }}
                _active={{ bg: "#A32A2A" }}
                borderRadius="full"
                fontSize={"20px"}
              >
                -
              </Button>
              <Text
                as="span"
                mx={3}
                color="white"
                fontSize="20px"
                fontWeight="semibold"
              >
                1
              </Text>
              <Button
                size="sm"
                bg="#F74D4D"
                color="white"
                _hover={{ bg: "#C63C3C" }}
                _active={{ bg: "#A32A2A" }}
                borderRadius="full"
              >
                +
              </Button>
            </Box>
          </Box>
        </Flex>
        
        {/* pembatas */}
        <Divider borderColor="gray.600" my={4} />
        
        {/* total */}
        <Text
          textAlign={"end"}
          color={"white"}
          fontWeight={"bold"}
          fontSize={"20px"}
          mr={"1%"}
        >
          Total : <span>Rp.500.000</span>
        </Text>
        
        {/* button checkout */}
        <Flex justify="flex-end" mr={"1%"}>
          <Button bgColor={"#F74D4D"} color="white" _hover={{ bg: "#C63C3C" }} mt={4} w={"160px"} mb={2}>
            Checkout
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
