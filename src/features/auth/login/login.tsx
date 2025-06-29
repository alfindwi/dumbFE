import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Img,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { loginAsync } from "../../../store/auth/async";
import { loginSchema, LoginSchema } from "../../../validations/loginSchema";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const res = await dispatch(loginAsync(data));

    if (loginAsync.fulfilled.match(res)) {
      toast({
        title: "Welcome.",
        description: "Welcome to DumbMerch.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      reset({
        email: "",
        password: "",
      });

      const role = res.payload.user.role;
      navigate(role === "ADMIN" ? "/admin" : "/");
    } else if (loginAsync.rejected.match(res) && error) {
      toast({
        title: "Login Failed",
        description: "invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
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
            padding={"5px 50px"}
            bgColor={"#F74D4D"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
          >
            Login
          </Button>
          <Button
            as={Link}
            to={"/register"}
            padding={"5px 50px"}
            bgColor={"transparent"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Bagian Kanan - Form Login */}
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
          Login
        </Text>
        <form onClick={handleSubmit(onSubmit)}>
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
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
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
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            width="full"
            padding={"25px 10px"}
            bgColor={"#F74D4D"}
            color={"white"}
            _hover={{ bgColor: "#D63C3C" }}
            fontWeight={"bold"}
            type="submit"
          >
            {loading ? <Spinner color="white" /> : "Login"}
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
