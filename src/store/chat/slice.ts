import { createSlice } from "@reduxjs/toolkit";
import { getMessage, getOrCreateRoom } from "./async";
import { IMessage, IRoom } from "../../types/message";
import { IUser } from "../../types/user";
import { getUserAsync } from "../user/async";

interface ChatState {
  messages: IMessage[];
  room: IRoom[];
  allUser: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  room: [],
  allUser: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.loading = false;
      })         
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrCreateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrCreateRoom.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.room = [action.payload];
        }
      })      
      .addCase(getOrCreateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.allUser = action.payload;
        state.loading = false;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;
