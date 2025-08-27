import { Box, Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { createCategory, getCategory } from "../../../../store/category/async";

export function AddCategory() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [name, setName] = useState("");
  const {loading} = useAppSelector((state) => state.category);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Category name is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    console.log("ini dari category", name);

    try {
      const resultAction = await dispatch(createCategory({ name }));
      if (createCategory.fulfilled.match(resultAction)) {
        toast({
          title: "Category added.",
          description: "Your category has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(getCategory());
        setName("");
      } else {
        throw new Error("Failed to add category");
      }

    } catch (error) {
      toast({
        title: "An error occurred.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={1}>
        <Input
          mb={2}
          placeholder="Category Name"
          type="text"
          width="100%"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          bg="#F74D4D"
          ml="83%"
          mt={2}
          type="submit"
          _hover={{ bg: "#D63C3C" }}
        >
          {loading ? <Spinner /> : "Save"}
        </Button>
      </Box>
    </form>
  );
}
