import { Box, Button, Icon, Input, Textarea } from "@chakra-ui/react";
import { FaFileImage } from "react-icons/fa6";

export function EditProduct() {
  return (
    <Box p={1}>
      <Box mb={4} textAlign="center">
        <Input type="file" id="profile-picture" display="none" />
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

      <Input mb={2} placeholder="Product Name" type="text" width={"100%"} />
      <Textarea
        mb={2}
        placeholder="Product Desc"
        width={"100%"}
        height="100px"
        resize="none"
      />
      <Input mb={2} placeholder="Price" type="number" width={"100%"} />
      <Input mb={2} placeholder="Qty" type="number" width={"100%"} />

    </Box>
  );
}


