import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import booksReducer from "./reducers/booksReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    books: booksReducer,
  },
});

export default store;
