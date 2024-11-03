import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { Navbar } from "../../../navbar/navbar";
import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { getProducts } from "../../../../store/product/async";
import { useNavigate, useParams } from "react-router-dom";
import { createCart } from "../../../../store/cart/async";

export function Detail() {
  return (
    <>
      <Navbar />
      <DetailProduct />
    </>
  );
}

export function DetailProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.product);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddCart = (productId : number) => {
    dispatch(createCart({ productId }))
    .then(() => {
      navigate("/chart")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return 
  }

  return (
    <Flex flexDirection="column" alignItems="center" mt={5}>
      <Box
        bg={"#212121"}
        borderRadius={"md"}
        h={"87%"}
        w={"87%"}
        maxW={"100%"}
        display="flex"
        position="relative"
        key={product.id}
      >
        <Flex>
          <Img
            src={product.image}
            borderRadius={"20px"}
            w={"380px"}
            h={"400px"}
            objectFit={"cover"}
            mr={8}
            p={4}
          />

          <Box
            color={"white"}
            display="flex"
            maxH={"400px"}
            flexDirection="column"
            mt={2}
            w="100%"
          >
            <Text fontSize="30px" color={"#F74D4D"} fontWeight="bold">
              {product.product_name}
            </Text>
            <Text fontSize="14px" mb={5} mt={2}>
              Stok : {product.stok}
            </Text>
            <Box mb={5} paddingRight={3}>
              <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
              <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
              <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
              <Text fontSize={"15px"}>-Bisa Menangkap tikus</Text>
              <Text
                fontSize={"15px"}
                mt={5}
                w={"100%"}
                maxW={"95%"}
                textAlign={"justify"}
              >
                {product.product_desc}
              </Text>
            </Box>

            <Text
              fontSize="25px"
              position="absolute"
              bottom={4}
              right={4}
              color={"#F74D4D"}
              fontWeight="bold"
            >
              Rp.{product.price}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Button
        mt={6}
        w={"50%"}
        bgColor={"#F74D4D"}
        color={"white"}
        _hover={{ bgColor: "#D63C3C" }}
        ml={"38%"}
        onClick={() => handleAddCart(product.id)}
      >
        Add to Cart
      </Button>
    </Flex>
  );
}
