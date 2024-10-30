import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../store";
import React, { useEffect, useState } from "react";
import { updateCategory } from "../../../../store/category/async";

export function EditCategory({category} : {category: any}) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [name, setName] = useState(category?.name ?? "");

  useEffect(() => {
    setName(category?.name ?? "");
  }, [category]);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if(!name.trim()) {
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

    try {
      const resultAction = await dispatch(updateCategory({id: category.id, formData}));
      if (updateCategory.fulfilled.match(resultAction)) {
        toast({
          title: "Category updated.",
          description: "Your category has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to update category");
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
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box p={1}>
      <Input mb={2} placeholder="Category" value={name} onChange={(e) => setName(e.target.value)} type="text" width={"100%"} />
      <Button bg={"#F74D4D"} mt={4} _hover={{ bg: "#D63C3C" }} type="submit" ml={"84%"}>
        Save
      </Button>
    </Box>
    </form>
  );
}
