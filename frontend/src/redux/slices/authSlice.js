import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateProfileSuccess: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
        profile: {
          ...state.user?.profile,
          ...action.payload?.profile,
        },
      };
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, updateProfileSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
