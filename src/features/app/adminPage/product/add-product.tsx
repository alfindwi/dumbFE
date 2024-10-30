import { Box, Button, Icon, Input, Select, Spinner, Textarea, useToast } from "@chakra-ui/react";
import { FaFileImage } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect, useState } from "react";
import { createProduct } from "../../../../store/product/async";
import { getCategory } from "../../../../store/category/async";

export function AddProduct() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stok, setStok] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");

  const { category} = useAppSelector((state) => state.category)
  const {loading} = useAppSelector((state) => state.product)

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_desc", productDesc);
    formData.append("price", price);
    formData.append("stok", stok);
    formData.append("categoryId", categoryId)
    if (image) {
      formData.append("image", image);
    }

    try {
      const resultAction = await dispatch(createProduct(formData));
      if (createProduct.fulfilled.match(resultAction)) {
        toast({
          title: "Product added.",
          description: "Your product has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to add product");
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
        <Box mb={4} textAlign="center">
          <Input type="file" id="profile-picture" display="none" onChange={handleFileChange} />
          <label htmlFor="profile-picture">
            <Button
              as="span"
              border={"2px solid #363636"}
              leftIcon={<Icon as={FaFileImage} />}
              cursor="pointer"
              bg={"transparent"}
              _hover={{ bg: "none" }}
              width={"100%"}
            >
              Upload Image
            </Button>
          </label>
        </Box>

        <Input
          mb={2}
          placeholder="Product Name"
          type="text"
          width={"100%"}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Textarea
          mb={2}
          placeholder="Product Desc"
          width={"100%"}
          height="100px"
          resize="none"
          onChange={(e) => setProductDesc(e.target.value)}
        />
        <Input
          mb={2}
          placeholder="Price"
          type="number"
          width={"100%"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          mb={2}
          placeholder="Qty"
          type="number"
          width={"100%"}
          onChange={(e) => setStok(e.target.value)}
        />
        <Select mt={1} mb={2} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="" disabled>Selected Category</option>
          {category && category.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Button bg={"#F74D4D"} ml={"83%"} mt={2} type="submit" _hover={{ bg: "#D63C3C" }}>
          {loading ? <Spinner/> : "Save"}
        </Button>
      </Box>
    </form>
  );
}
