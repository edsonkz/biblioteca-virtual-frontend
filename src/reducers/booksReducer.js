import { createSlice } from "@reduxjs/toolkit";
import bookServices from "../services/book";
import readBookServices from "../services/readBook";

const bookSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    appendBook(state, action) {
      state.push(action.payload);
    },
    setBooks(state, action) {
      return action.payload;
    },
  },
});

export const { appendBook, setBooks } = bookSlice.actions;

export const initializeBooks = () => {
  return async (dispatch) => {
    try {
      const books = await bookServices.getAll();
      dispatch(setBooks(books));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createReadBook = (userId, bookId) => {
  return async (dispatch) => {
    try {
      await readBookServices.updateStatus(userId, bookId);
    } catch (error) {
      console.error(error);
    }
  };
};

export default bookSlice.reducer;
