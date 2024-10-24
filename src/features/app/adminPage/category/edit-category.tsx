import { Box, Input } from "@chakra-ui/react";

export function EditCategory() {
  return (
    <Box p={1}>
      <Input mb={2} placeholder="Category" type="text" width={"100%"} />
    </Box>
  );
}
