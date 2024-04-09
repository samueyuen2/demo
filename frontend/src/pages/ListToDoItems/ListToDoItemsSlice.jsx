import {
  createAsyncThunk, createSlice,
  isRejected, isPending, isFulfilled,
} from "@reduxjs/toolkit";
import moment from "moment-timezone";
import * as toDoItemsApi from "../../api/toDoItems";

const initialState = {
  toDoItems: {
    isLoading: true,
    rows: [],
    totalCount: 0,
  },
};

export const searchToDoItems = createAsyncThunk(
  "listToDoItems/searchToDoItems",
  async (payload) => {
    const response = await toDoItemsApi.search(payload);
    return response.data;
  }
);

export const createToDoItem = createAsyncThunk(
  "listToDoItems/createToDoItem",
  async (payload) => {
    const createRes = await toDoItemsApi.create(payload);
    const searchrRes = await toDoItemsApi.search();
    return searchrRes.data
  }
);

export const modifyToDoItem = createAsyncThunk(
  "listToDoItems/modifyToDoItem",
  async (payload) => {
    const modifyRes = await toDoItemsApi.modify(payload);
    const searchrRes = await toDoItemsApi.search();
    return searchrRes.data;
  }
);

export const listEventsSlice = createSlice({
  name: "listToDoItems",
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(searchToDoItems, createToDoItem, modifyToDoItem), (state, action) => {
        state.toDoItems.isLoading = true;
      })
      .addMatcher(isFulfilled(searchToDoItems, createToDoItem, modifyToDoItem), (state, action) => {
        state.toDoItems.isLoading = false;
        state.toDoItems.rows = action?.payload?.data
          ?.sort((a, b) => { return moment(a.createdAt).valueOf() > moment(b.createdAt).valueOf() ? -1 : 1 })
        state.toDoItems.totalCount = action?.payload?.data.length;
      })
      .addMatcher(isRejected(searchToDoItems, createToDoItem, modifyToDoItem), (state, action) => {
        state.toDoItems.isLoading = false;
        state.toDoItems.rows = [];
        state.toDoItems.totalCount = 0;
      })
  },
});

export default listEventsSlice;