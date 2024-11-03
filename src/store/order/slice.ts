import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types/order";
import { createOrder, getOrder } from "./async";

interface orderState {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: orderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get order
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //   create order
    builder
      .addCase(createOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
          state.orders.push(action.payload);
          state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
      })
  },
});

export default orderSlice.reducer;
