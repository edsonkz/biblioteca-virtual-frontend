import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const saveUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const userInfo = await loginService.login(email, password);
      window.localStorage.setItem("loggedUser", JSON.stringify(userInfo));
      dispatch(setUser(userInfo));
    } catch (error) {
      dispatch(setNotification("Email e/ou senha incorretos", 5, true));
    }
  };
};

export const logoutUser = (user) => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(removeUser(user));
  };
};
export default userSlice.reducer;
