import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || "",
  role: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    register: (state, action) => {
      const { user, role, token } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      state.user = user;
      state.token = token;
      state.role = role;
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (storedUser) {
        if (storedUser.email === email && storedUser.password === password) {
          state.user = storedUser;
          state.role = storedUser.role;
          state.token = storedUser.token;
        } else {
          state.user = null;
          state.role = "";
          state.token = "";
        }
      } else {
        state.user = null;
        state.role = "";
        state.token = "";
      }
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.role = "";
      state.token = "";
    },
  },
});

export const { register, login, logout } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;
