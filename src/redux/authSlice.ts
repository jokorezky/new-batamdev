import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface Community {
  name: string;
  url: string;
}

interface company {
  name: string;
  url: string;
}

interface User {
  _id: string;
  full_name: string;
  avatar?: string;
  email?: string;
  headline?: string;
  bio?: string;
  picture?: string;
  roles?: string[];
  communities?: Community[];
  companies?: company[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loadingUser: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loadingUser: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      Cookies.remove("token");
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser(state, action: PayloadAction<User>) {
      if (state.isAuthenticated) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setLoadingUser(state, action: PayloadAction<boolean>) {
      state.loadingUser = action.payload;
    },
  },
});

export const { login, logout, updateUser, setLoadingUser } = authSlice.actions;

export default authSlice.reducer;
