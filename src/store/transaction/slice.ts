import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../types/order";
import { getTransaction } from "./async";

interface productState {
  order: IOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: productState = {
  order: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get transaction
    builder
      .addCase(getTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.order = action.payload.transaction;
        state.loading = false;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
