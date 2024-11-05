import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";


export const getMessage = createAsyncThunk(
  "chat/getMessage",
  async (data: { roomId: number }, thunkAPI) => {
    try {
      const res = await api.get(`/chat/rooms/${data.roomId}/message`);
      return res.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

