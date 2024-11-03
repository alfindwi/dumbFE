import { Badge, Box, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { LOGOUT } from "../../store/auth/slice";
import Cookies from "js-cookie";

export function Navbar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {cart} = useAppSelector((state) => state.cart);
  const handleLogout = () => {
    dispatch(LOGOUT());
    Cookies.remove("token");
    Cookies.remove("role");
  };
  
  return (
    <Flex
      as="nav"
      bg="black"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      boxShadow="sm"
    >
      <Flex alignItems="center" as={Link} to="/" ml={5}>
        <Img src="/src/assets/logo.svg" alt="Logo" width="50px" zIndex={2} />
      </Flex>

      <Flex gap={8} mr={5} alignItems="center">
        <Link to={"/chart"}>
          <Box position="relative" display="inline-block">
            <Icon
              as={FaShoppingCart}
              fontSize="24px"
              color={location.pathname === "/chart" ? "#F74D4D" : "white"}
              _hover={{ color: "#F74D4D" }}
              cursor="pointer"
            />
          {cart && cart.length > 0 && (
            <Badge
              position="absolute"
              top="-1" 
              right="-2"
              bg="#F74D4D"
              color="white"
              borderRadius="full"
              fontSize="12px"
              w="18px"
              h="18px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 4px rgba(0, 0, 0, 0.5)" 
            >
              {cart.length}
            </Badge>
          )}
          </Box>
        </Link>

        <Flex alignItems="center" gap={2}>
          <Text
            as={Link}
            to="/complain"
            color={location.pathname === "/complain" ? "#F74D4D" : "white"}
            fontWeight="bold"
            _hover={{ color: "#F74D4D" }}
          >
            Complain
          </Text>
        </Flex>

        <Text
          as={Link}
          to="/profile"
          color={location.pathname === "/profile" ? "#F74D4D" : "white"}
          fontWeight="bold"
          _hover={{ color: "#F74D4D" }}
        >
          Profile
        </Text>

        <Text
          as={Link}
          to="/login"
          color="white"
          fontWeight="bold"
          _hover={{ color: "#F74D4D" }}
          onClick={handleLogout}
        >
          Logout
        </Text>
      </Flex>
    </Flex>
  );
}
