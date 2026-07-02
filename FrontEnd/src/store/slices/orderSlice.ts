import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { OrderPayload } from "../../types";

interface OrderState {
  loading: boolean;
  error: string | null;
  success: boolean;
  orderId: string | null;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  success: false,
  orderId: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (data: OrderPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/orders", data);
      return res.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderId = action.payload._id;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
