import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/category");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data: { name: string }, thunkAPI) => {
    try {
      const res = await api.post("/admin/category", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to add category");
    }
  }
);


export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data: { id: number; formData: FormData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/category/${data.id}`, data.formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: AxiosError | any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/admin/category/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
