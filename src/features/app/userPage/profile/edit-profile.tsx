import { Box, Button, Icon, Input, Select, Textarea } from "@chakra-ui/react";
import { FaFileImage } from "react-icons/fa6";

export function EditProfile() {
    return (
      <Box p={1}>
        <Box mb={4} textAlign="center">
          <Input
            type="file"
            id="profile-picture"
            display="none" 
          />
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
              Upload Profile Picture
            </Button>
          </label>
        </Box>
  
        <Input mb={2} placeholder="Name" type="text" width={"100%"} />
        <Input mb={2} placeholder="Email" type="email" width={"100%"} />
        <Input mb={2} placeholder="Phone" type="number" width={"100%"} />
        
        <Select mb={2} width={"100%"}>
          <option value="" disabled selected hidden>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
  
        <Textarea mb={2} placeholder="Address" width={"100%"} height="100px" resize="none" />
      </Box>
    );
  }