import { Navbar } from "../../../navbar/navbar";
import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";

export function Detail() {
  return (
    <>
      <Navbar />
      <DetailProduct />
    </>
  );
}

export function DetailProduct() {
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        mt={5}
      >
        <Box bg={"#212121"} h={"400px"} maxW={"80%"} display="flex">
          <Flex>
            <Img
              src="/src/assets/kucing.jpg"
              w={"380px"}
              h={"400px"}
              objectFit={"cover"}
              mr={8}
            />
  
            <Box color={"white"} display="flex" flexDirection="column" mt={2}>
              <Text fontSize="30px" color={"#F74D4D"} fontWeight="bold">
                CAT RUMAH
              </Text>
              <Text fontSize="14px" mb={5} mt={2}>
                Stok : 600
              </Text>
              <Box mb={5} paddingRight={3}>
                <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
                <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
                <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
                <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
                <Text fontSize={"15px"} mt={5} textAlign={"justify"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate doloribus, modi magnam ut ipsam quibusdam repellat
                  quis minima, tenetur voluptates aspernatur eum natus
                  voluptatibus ab quisquam esse exercitationem illo itaque totam
                  quo iure, repudiandae nam soluta. Officia a excepturi facere
                  blanditiis. Nemo accusamus fugiat fugit sit vero explicabo,
                  impedit iure.
                </Text>
              </Box>
              <Text
                fontSize="25px"
                textAlign={"right"}
                mr={4}
                color={"#F74D4D"}
                fontWeight="bold"
              >
                Rp.500.000
              </Text>
            </Box>
          </Flex>
        </Box>
  
        <Button
          mt={6}
          w={"50%"}
          bgColor={"#F74D4D"}
          color={"white"}
          ml={"30%"}
          _hover={{ bgColor: "#D63C3C" }}
        >
          Buy
        </Button>
      </Flex>
    );
  }
  
