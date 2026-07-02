import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { SendOtpResponse, User, VerifyOtpResponse } from "../../types";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  email: string | null;
  isNewUser: boolean;
  devOtp: string | null;
  needsName: boolean;
}

const stored = localStorage.getItem("user");
const initialState: AuthState = {
  user: stored ? JSON.parse(stored) : null,
  loading: false,
  error: null,
  otpSent: false,
  email: null,
  isNewUser: false,
  devOtp: null,
  needsName: false,
};

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await api.post<SendOtpResponse>("/auth/send-otp", { email });
      return res.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    data: { email: string; otp: string; name?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post<VerifyOtpResponse>("/auth/verify-otp", data);
      return res.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.otpSent = false;
      state.email = null;
      state.isNewUser = false;
      state.devOtp = null;
      state.needsName = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    resetOtpFlow: (state) => {
      state.otpSent = false;
      state.email = null;
      state.isNewUser = false;
      state.devOtp = null;
      state.needsName = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.email = action.payload.email;
        state.isNewUser = action.payload.isNewUser;
        state.devOtp = action.payload.devOtp || null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.needsName) {
          state.needsName = true;
          return;
        }

        if (action.payload.token) {
          const user: User = {
            _id: action.payload._id!,
            name: action.payload.name!,
            email: action.payload.email!,
            token: action.payload.token,
          };
          state.user = user;
          state.otpSent = false;
          state.needsName = false;
          state.devOtp = null;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", user.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, resetOtpFlow } = authSlice.actions;
export default authSlice.reducer;
