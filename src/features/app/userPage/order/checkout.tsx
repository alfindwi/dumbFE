import { Box, Text, Flex, Img, Divider, Button } from "@chakra-ui/react";
import { Navbar } from "../../../navbar/navbar";
import { FaLocationDot } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect } from "react";
import { createOrder, getOrder } from "../../../../store/order/async";
import { getCart } from "../../../../store/cart/async";

export function Checkout() {
  return (
    <Box h="100%" bg={"black"}>
      <Navbar />
      <CheckOutForm />
    </Box>
  );
}
export function CheckOutForm() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cart, id: cartId } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handlePayment = async () => {
    if (!cart || cart.length === 0) {
      console.log("No cart items to process.");
      return;
    }

    try {
      const { token } = await dispatch(
        createOrder({ cartId: cartId ?? 0 })
      ).unwrap();

      if (!token) {
        throw new Error("Transaction Token is undefined");
      }

      console.log("Transaction Token:", token);

      window.snap.pay(token, {
        onSuccess: function () {
          console.log("Payment success");
        },
        onPending: function () {
          console.log("Transaction pending");
        },
        onError: function () {
          console.log("Payment failed");
        },
      });
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  return (
    <Box>
      <Text
        color={"#F74D4D"}
        ml={"5%"}
        mt={"1%"}
        fontWeight={"bold"}
        fontSize={"25px"}
      >
        CheckOut
      </Text>

      {!cart || cart.length === 0 ? (
        <Text
          color="white"
          ml={"33%"}
          fontWeight={"bold"}
          mt={4}
          fontSize={"50px"}
        >
          Checkout is empty
        </Text>
      ) : (
        <>
          <Box
            bg={"#212121"}
            w={"87%"}
            ml={"5%"}
            p={5}
            mt={4}
            mb={4}
            borderRadius="md"
          >
            <Flex align="center" mb={3}>
              <FaLocationDot color="white" size="20px" />
              <Text
                color={"white"}
                fontWeight={"bold"}
                fontSize={"20px"}
                ml={2}
              >
                Shipping Address
              </Text>
            </Flex>
            <Flex>
              <Box mt={3} ml={5} w={"30%"} p={2}>
                <Text color={"white"} fontWeight={"semibold"} fontSize={"18px"}>
                  {user?.name}
                </Text>
                <Text color={"white"} fontSize={"16px"}>
                  {user?.phone}
                </Text>
              </Box>
              <Box p={2} w={"70%"} ml={5} mt={3}>
                <Text color={"white"} fontSize={"16px"}>
                  {user?.address}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box
            bg={"#212121"}
            w={"87%"}
            ml={"5%"}
            p={5}
            mt={4}
            mb={4}
            borderRadius="md"
          >
            <Flex align="center" justify="space-between" mb={3}>
              <Text color={"white"} fontWeight={"bold"} fontSize={"20px"}>
                Ordered Products
              </Text>
              <Flex justify="space-between" w="50%">
                <Text
                  color={"white"}
                  fontWeight={"bold"}
                  fontSize={"17px"}
                  textAlign="center"
                >
                  Product Price
                </Text>
                <Text
                  color={"white"}
                  fontWeight={"bold"}
                  fontSize={"17px"}
                  textAlign="center"
                >
                  Quantity
                </Text>
                <Text
                  color={"white"}
                  fontWeight={"bold"}
                  fontSize={"17px"}
                  textAlign="center"
                >
                  Total Price
                </Text>
              </Flex>
            </Flex>

            <Box mt={3}>
              {cart.map((item) => (
                <Flex
                  key={item.id}
                  mt={3}
                  ml={1}
                  align="center"
                  justify="space-between"
                  w="100%"
                >
                  <Flex align="center" w="50%">
                    <Img
                      src={item.product?.image}
                      w={"70px"}
                      h={"60px"}
                      mr={4}
                    />
                    <Text
                      color={"white"}
                      fontWeight={"semibold"}
                      w={"76%"}
                      fontSize={"15px"}
                    >
                      {item.product?.product_name}
                    </Text>
                  </Flex>
                  <Flex w="50%" justify="space-between">
                    <Text color={"white"}>{`Rp. ${item.productPrice}`}</Text>
                    <Text color={"white"}>{item.quantity}</Text>
                    <Text color={"white"}>{`Rp. ${item.totalPrice}`}</Text>
                  </Flex>
                </Flex>
              ))}
            </Box>

            <Divider borderColor="gray.600" my={4} />

            <Text
              fontWeight={"bold"}
              color={"white"}
              mt={5}
              textAlign={"right"}
              fontSize={"20px"}
            >
              Total Payment
            </Text>
            <Text
              fontWeight={"bold"}
              color={"white"}
              mt={5}
              textAlign={"right"}
              fontSize={"20px"}
            >
              {`Rp. ${cart.reduce(
                (total, item) => total + item.totalPrice,
                0
              )}`}
            </Text>
          </Box>
        </>
      )}

      {cart && cart.length > 0 && (
        <Button
          w={"20%"}
          mb={5}
          mt={2}
          ml={"72%"}
          bgColor={"#F74D4D"}
          _hover={{ bgColor: "#D63C3C" }}
          onClick={handlePayment}
          disabled={!cartId}
        >
          Payment
        </Button>
      )}
    </Box>
  );
}
