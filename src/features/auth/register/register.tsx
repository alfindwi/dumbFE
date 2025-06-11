import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Img,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store"; // Adjust this import
import { SubmitHandler, useForm } from "react-hook-form";
import {
  registerSchema,
  RegisterSchema,
} from "../../../validations/registerSchema";
import { registerAsync } from "../../../store/auth/async";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { loading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const res = await dispatch(registerAsync(data));

    if (registerAsync.fulfilled.match(res)) {
      toast({
        title: "Account created.",
        description: "Successfully created account.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      reset({
        name: "",
        email: "",
        password: "",
      });
    }

    navigate("/login");
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="black"
      color="white"
      p={10}
    >
      <Box flex="1" ml={"7%"}>
        <Img src="https://res.cloudinary.com/db2rr1kej/image/upload/v1749618908/logo_khch8q.png" alt="Logo" width={"30%"} />
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
            as={Link}
            to={"/login"}
            padding={"5px 50px"}
            bgColor={"transparent"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
          >
            Login
          </Button>
          <Button
            padding={"5px 50px"}
            bgColor={"#F74D4D"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Bagian Kanan - Form Register */}
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
          Register
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={5} isInvalid={!!errors.name}>
            <Input
              type="text"
              padding={"25px 10px"}
              placeholder="Name"
              _placeholder={{ color: "#BCBCBC" }}
              bg="#555555"
              border={"none"}
              color="white"
              {...register("name")}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={5} isInvalid={!!errors.email}>
            <Input
              type="email"
              padding={"25px 10px"}
              placeholder="Email"
              _placeholder={{ color: "#BCBCBC" }}
              bg="#555555"
              border={"none"}
              color="white"
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={10} isInvalid={!!errors.password}>
            <Input
              type="password"
              padding={"25px 10px"}
              placeholder="Password"
              _placeholder={{ color: "#BCBCBC" }}
              bg="#555555"
              border={"none"}
              color="white"
              {...register("password")}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            width="full"
            padding={"25px 10px"}
            bgColor={"#F74D4D"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
            fontWeight={"bold"}
            type="submit"
            isLoading={loading}
          >
            {loading ? <Spinner color="white" /> : "Register"}
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
