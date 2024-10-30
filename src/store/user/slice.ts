import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { updateUserAsync } from "./async";

export interface UserState {
  user: IUser;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {} as IUser,
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;