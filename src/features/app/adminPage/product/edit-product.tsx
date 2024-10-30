import { Box, Button, Icon, Input, Textarea, useToast } from "@chakra-ui/react";
import { FaFileImage } from "react-icons/fa6";
import { useAppDispatch } from "../../../../store";
import { updateProduct } from "../../../../store/product/async";
import { useState } from "react";

export function EditProduct({ product }: { product: any }) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [product_name, setProductName] = useState(product.product_name ?? "");
  const [product_desc, setProductDesc] = useState(product.product_desc ?? "");
  const [price, setPrice] = useState(product.price ?? "");
  const [stok, setStock] = useState(product.stok ?? "");
  const [image, setImage] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_desc", product_desc);
    formData.append("price", price);
    formData.append("stok", stok);
    if (image) {
      formData.append("image", image);
    }

    try {
      const resultAction = await dispatch(updateProduct({ id: product.id, formData }));
      if (updateProduct.fulfilled.match(resultAction)) {
        toast({
          title: "Product updated.",
          description: "Your product has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to update product");
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
        {/* Input untuk Gambar */}
        <Box mb={4} textAlign="center">
          <Input
            type="file"
            id="product-image"
            display="none"
            onChange={handleImageChange}
          />
          <label htmlFor="product-image">
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

        {/* Input untuk Nama Produk */}
        <Input
          mb={2}
          placeholder="Product Name"
          type="text"
          width={"100%"}
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
        />

        {/* Input untuk Deskripsi Produk */}
        <Textarea
          mb={2}
          placeholder="Product Description"
          width={"100%"}
          height="100px"
          resize="none"
          value={product_desc}
          onChange={(e) => setProductDesc(e.target.value)}
        />

        {/* Input untuk Harga */}
        <Input
          mb={2}
          placeholder="Price"
          type="number"
          width={"100%"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Input untuk Jumlah Stok */}
        <Input
          mb={2}
          placeholder="Stock Quantity"
          type="number"
          width={"100%"}
          value={stok}
          onChange={(e) => setStock(e.target.value)}
        />

        {/* Tombol Simpan */}
        <Button
          bg={"#F74D4D"}
          ml={"83%"}
          mt={2}
          type="submit"
          _hover={{ bg: "#D63C3C" }}
        >
          Save
        </Button>
      </Box>
    </form>
  );
}
