import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/transaction", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
