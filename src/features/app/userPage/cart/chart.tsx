import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Img,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  createCartToOrder,
  deleteCart,
  getCart,
  updateCart,
} from "../../../../store/cart/async";
import { cartItems } from "../../../../types/cart";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart, totalAmount } = useAppSelector((state) => state.cart);

  const handleUpdateCart = async (cartItem: cartItems, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItem = { cartItemId: cartItem.id, newQuantity };
    console.log("Sending updated item to Redux:", updatedItem);

    try {
      await dispatch(updateCart(updatedItem)).unwrap();
      dispatch(getCart());
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCart(id));
  };

  const handleOrder = async () => {
    if (!cart || cart.length === 0) return;
  
    for (const cartItem of cart) {
      try {
        const result = await dispatch(createCartToOrder({ cartId: cartItem.cartId })).unwrap();
        console.log("Order created:", result);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  
    navigate("/checkout");
  };
  

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <Box>
      <Text color="#F74D4D" ml="5%" mt="2%" fontWeight="bold" fontSize="25px">
        Shopping Cart
      </Text>
      <Box bg="#212121" mt="3%" ml="5%" mr="5%" maxW="90%" borderRadius="md">
        {cart && cart.length > 0 ? (
          cart.map((carts) => (
            <Flex key={carts.id} p={3}>
              <Checkbox colorScheme="red" mr={4} ml={2} size="md" />
              <Img
                src={carts.product?.image}
                w="100%"
                maxW="150px"
                h="100%"
                maxH="500px"
              />
              <Box ml={2} w="40%" h="100%">
                <Text color="#F74D4D" fontWeight="bold" fontSize="24px">
                  {carts.product?.product_name}
                </Text>
                <Text color="white" mt={2}>
                  {carts.product?.product_desc}
                </Text>
              </Box>
              <Box ml="auto">
                <Text
                  mt={3}
                  ml={2}
                  color="white"
                  fontWeight="bold"
                  fontSize="20px"
                >
                  Rp. {carts.product?.price}
                </Text>

                <Box display="flex" mt={9} alignItems="center">
                  <Button
                    size="sm"
                    bg="#F74D4D"
                    color="white"
                    _hover={{ bg: "#C63C3C" }}
                    _active={{ bg: "#A32A2A" }}
                    borderRadius="full"
                    fontSize="20px"
                    onClick={() =>
                      handleUpdateCart(carts, Math.max(carts.quantity - 1, 1))
                    }
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
                    {carts.quantity}
                  </Text>
                  <Button
                    size="sm"
                    bg="#F74D4D"
                    color="white"
                    _hover={{ bg: "#C63C3C" }}
                    _active={{ bg: "#A32A2A" }}
                    borderRadius="full"
                    onClick={() => handleUpdateCart(carts, carts.quantity + 1)}
                  >
                    +
                  </Button>

                  <Button
                    bgColor="transparent"
                    _hover={{ bg: "transparent" }}
                    onClick={() => handleDelete(carts.id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </Box>
              </Box>
            </Flex>
          ))
        ) : (
          <Text color="white" textAlign="center" py={5}>
            Your cart is empty.
          </Text>
        )}

        <Divider borderColor="gray.600" my={4} />

        <Text
          textAlign="end"
          color="white"
          fontWeight="bold"
          fontSize="20px"
          mr="1%"
        >
          Total : <span>Rp.{totalAmount}</span>
        </Text>

        <Flex justify="flex-end" mr="1%">
          <Button
            bgColor="#F74D4D"
            color="white"
            _hover={{ bg: "#C63C3C" }}
            mt={4}
            w="160px"
            mb={2}
            onClick={handleOrder}
            isDisabled={!cart || cart.length === 0}
          >
            Checkout
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
