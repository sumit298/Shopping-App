import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : "";

const refreshToken = localStorage.getItem("refreshToken")
  ? localStorage.getItem("refreshToken")
  : "";

const initialState = {
  userDetails: {},
  loading: false,
  error: null,  
  success: false,
  accessToken: accessToken,
  refreshToken: refreshToken,
  profile: null
};

const baseURL = "http://localhost:5000/api/v1/users";
export const loginAuthenticate = createAsyncThunk(
  "authentication/authLogin",
  async (loginCred) => {
    const response = await axios(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: loginCred,
    });
    
    const accessToken = response.accessToken;
    const refreshToken = response.refreshToken;
    if (
      !(localStorage.getItem("accessToken")) ||
      !(localStorage.getItem("refreshToken"))
      ) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
      
    console.log(response.data);
    return response.data;
  }
);

export const getProfile = createAsyncThunk(
  'authentication/getProfile',
  async () => {
    try {
      const token = localStorage.getItem('accessToken') || null;
      console.log(token)// Get the bearer token from the authentication state
      const response = await axios.get(`${baseURL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the bearer token in the request headers
        }
      });

      if (response.status === 200) {
        const user = response.data;
        console.log(user)
        // Process the user data
      } else {
        // Handle the error response
      }
    } catch (error) {
      // Handle the request error
      console.error(error);
    }
  }
);

export const RegisterAuthenticate = createAsyncThunk(
  "authentication/authRegister",
  async (registerCred) => {
    const response = await axios(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: registerCred,
    });
    return response.data;
  }
);

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.userDetails = {}
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterAuthenticate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterAuthenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.authentication = action.payload;
      })
      .addCase(RegisterAuthenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginAuthenticate.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuthenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginAuthenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state)=> {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action)=> {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action)=> {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = AuthenticationSlice.actions;
export const Authentication = (state) => state.authentication;

export const AuthenticationReducer = AuthenticationSlice.reducer;
