import {
  createAsyncThunk, createSlice,
  isRejected, isPending, isFulfilled,
} from "@reduxjs/toolkit";
import moment from "moment-timezone";
import * as orderApi from "../../../api/order";
import * as brandApi from "../../../api/brand";
import * as retailerApi from "../../../api/retailer";
import * as itemApi from "../../../api/item";
import * as manufacturerApi from "../../../api/manufacturer";
import * as manufacturerBrandApi from "../../../api/manufacturerBrand";
import * as categoryApi from "../../../api/categories";

const initialState = {
  brands: [],
  retailers: [],
  manufacturers: [],
  categories: [],
  records: []
};

export const getBasicInfo = createAsyncThunk(
  "fullTable/getBasicInfo",
  async (payload) => {
    const brands = await brandApi.search(payload);
    const manufacturers = await manufacturerApi.search(payload);
    const retailers = await retailerApi.search(payload);
    const categories = await categoryApi.search(payload);
    return {
      brands: brands.data.data,
      manufacturers: manufacturers.data.data,
      retailers: retailers.data.data,
      categories: categories.data.data,
    }
  }
);

export const searchRecords = createAsyncThunk(
  "fullTable/searchRecords",
  async (payload) => {
    const records = await itemApi.search(payload);
    console.log(records.data.data)
    return {
      records: records.data.data,
    }
  }
);

export const fullTableSlice = createSlice({
  name: "fullTable",
  initialState,
  reducers: {
    cleanResult: (state, action) => { state.result = {} },
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBasicInfo.fulfilled, (state, action) => {
        state.brands = action?.payload?.brands;
        state.manufacturers = action?.payload?.manufacturers;
        state.retailers = action?.payload?.retailers;
        state.categories = action?.payload?.categories;
      })
      .addCase(getBasicInfo.rejected, (state, action) => {
        state.brands = []
        state.manufacturers = []
        state.retailers = []
        state.categories = []
      })
      .addCase(searchRecords.fulfilled, (state, action) => {
        state.records = action?.payload?.records;
      })
      .addCase(searchRecords.rejected, (state, action) => {
        state.records = []
      })
  },
});

export default fullTableSlice;