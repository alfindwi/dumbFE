import {
  Box,
  Button,
  Icon,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { updateUserAsync } from "../../../../store/user/async";

export function EditProfile() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        address: user.address,
      });
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUserAsync({
        data: {
          ...formData,
          imageFile: file || undefined, // 👈 Beda nama dari IUser.image
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={1}>
        <Box mb={4} textAlign="center">
          <Input
            type="file"
            id="profile-picture"
            display="none"
            onChange={handleFileChange}
          />
          <label htmlFor="profile-picture">
            <Button
              as="span"
              leftIcon={<Icon as={FaFileImage} />}
              cursor="pointer"
              bg="transparent"
              _hover={{ bg: "none" }}
              width="100%"
            >
              Upload Profile Picture
            </Button>
          </label>
        </Box>

        <Input
          mb={2}
          placeholder="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          width="100%"
        />
        <Input
          mb={2}
          placeholder="Phone"
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          width="100%"
        />

        <Select
          mb={2}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          width="100%"
          required
        >
          <option value="" disabled hidden>
            Select Gender
          </option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </Select>

        <Textarea
          mb={2}
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          width="100%"
          height="100px"
          resize="none"
        />

        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}

        <Button
          type="submit"
          width="full"
          bgColor="#F74D4D"
          color="white"
          _hover={{ bgColor: "#D63C3C" }}
          fontWeight="bold"
          isDisabled={loading}
        >
          {loading ? <Spinner color="white" /> : "Update Profile"}
        </Button>
      </Box>
    </form>
  );
}
