import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { createCart } from "../../../../store/cart/async";
import { getProducts } from "../../../../store/product/async";
import { Navbar } from "../../../navbar/navbar";

export function Home() {
  return (
    <Box h="100vh" bg={"black"}>
      <Navbar />
      <Card />
    </Box>
  );
}

export function Card() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddCart = (productId: number) => {
    dispatch(createCart({ productId }))
      .then(() => {
        navigate("/chart");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box p={7}>
      <Text color="#F74D4D" fontWeight={"bold"} fontSize={"26px"}>
        Products
      </Text>
      <Flex
        ml={"5%"}
        mt={4}
        gap={2}
        wrap={"wrap"}
        justifyContent={"flex-start"}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            bgColor={"#212121"}
            mt={2}
            borderRadius="md"
            w={"250px"}
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            transition="transform 0.5s ease, box-shadow 0.2s ease"
            gap={"20px"}
          >
            <Flex direction={"column"} as={Link} to={`/detail/${product.id}`}>
              <Img
                src={product.image}
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
                  isTruncated
                >
                  {product.product_name}
                </Text>
                <Flex
                  mt={1}
                  color="white"
                  alignItems="center"
                  justifyContent="space-between"
                  w={"100%"}
                >
                  <Text>Rp. {product.price}</Text>
                  <Text
                    fontSize={"14px"}
                    color={"#6A6A6A"}
                    mr={2}
                    fontWeight={"semibold"}
                  >
                    Stok: <span>{product.stok}</span>
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Button
              mt={3}
              w={"90%"}
              mb={2}
              ml={3}
              color={"white"}
              bgColor={"#F74D4D"}
              _hover={{ bgColor: "#D63C3C" }}
              onClick={() => handleAddCart(product.id)}
            >
              Add to cart
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
