import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { Testimonial } from "../../types";

interface TestimonialsState {
  items: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/testimonials");
      return res.data as Testimonial[];
    } catch {
      return rejectWithValue("Failed to fetch testimonials");
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default testimonialsSlice.reducer;
