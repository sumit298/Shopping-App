import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/users";

export const authlogin = createAsyncThunk("auth/login", async (loginCred) => {
  try {
    const user = await axios(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginCred,
    });
    const result = await user.json();

    // console.log(result);

    const accessToken = result.accessToken;
    const refreshToken = result.refreshToken;
    if (
      !localStorage.getItem("accessToken") ||
      !localStorage.getItem("refreshToken")
    ) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Login Failed");
  }
});

export const authRegister = createAsyncThunk(
  "auth/register",
  async (registerCred) => {
    try {
      const user = await axios(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: registerCred,
      });
      return user;
    } catch (error) {
      throw new Error("Registration Failed");
    }
  }
);

const initialState = {
  auth: null,
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if(localStorage.getItem('accessToken')!== null){
        
      }
      state.auth = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state, action) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.auth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset the error state
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(authlogin.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset the error state
      })
      .addCase(authlogin.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(authlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const authObject = (state=> state.auth);

export const { login, logout } = AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer;
