import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types/order";
import { createOrder, getOrder, updatePaymentStatus } from "./async";

interface OrderState {
  orders: IOrder[]; 
  loading: boolean;
  error: string | null;
  transaction: {
    token: string;
    redirect_url: string;
  } | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  transaction: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get order
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action: PayloadAction<OrderState["orders"]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<{ token: string; redirect_url: string }>) => {
        state.transaction = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update payment status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default orderSlice.reducer;
