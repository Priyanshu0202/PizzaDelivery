// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token") || null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      Cookies.set("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAdmin = false;
      Cookies.remove("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
