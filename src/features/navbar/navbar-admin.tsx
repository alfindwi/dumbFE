import { Flex, Img, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export function NavbarAdmin() {
  const location = useLocation();

  return (
    <Flex
      as="nav"
      bg="black"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      boxShadow="sm"
      zIndex={1}
    >
      <Flex alignItems="center" as={Link} to="/admin" ml={5}>
        <Img src="/src/assets/logo.svg" alt="Logo" width="50px" zIndex={2} />
      </Flex>

      <Flex gap={8} mr={5} alignItems="center">
        

        <Flex alignItems="center" gap={2}>
          <Text
            as={Link}
            to="/admin/complain"
            color={location.pathname === "/complain" ? "#F74D4D" : "white"}
            fontWeight="bold"
            _hover={{ color: "#F74D4D" }}
          >
            Complain
          </Text>
        </Flex>

        <Text
          as={Link}
          to="/admin/category"
          color={location.pathname === "/profile" ? "#F74D4D" : "white"}
          fontWeight="bold"
          _hover={{ color: "#F74D4D" }}
        >
          Category
        </Text>

        <Text
          as={Link}
          to="/admin/product" 
          color={location.pathname === "/profile" ? "#F74D4D" : "white"}
          fontWeight="bold"
          _hover={{ color: "#F74D4D" }}
        >
          Product
        </Text>

        <Text
          as={Link}
          to="/login"
          color="white"
          fontWeight="bold"
          _hover={{ color: "#F74D4D" }}
        >
          Logout
        </Text>
      </Flex>
    </Flex>
  );
}
