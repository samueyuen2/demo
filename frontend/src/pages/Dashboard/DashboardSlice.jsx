import {
  createAsyncThunk, createSlice,
  isRejected, isPending, isFulfilled,
} from "@reduxjs/toolkit";
import moment from "moment-timezone";
import * as orderApi from "../../api/order";
import * as brandApi from "../../api/brand";
import * as retailerApi from "../../api/retailer";
import * as itemApi from "../../api/item";
import * as manufacturerApi from "../../api/manufacturer";
import * as manufacturerBrandApi from "../../api/manufacturerBrand";
import * as categoryApi from "../../api/categories";

const initialState = {
  brands: [],
  retailers: [],
  manufacturers: [],
  categories: [],
  items: [],
  result: [],
};

export const getBasicInfo = createAsyncThunk(
  "dashboard/getBasicInfo",
  async (payload) => {
    const manufacturers = await manufacturerApi.search(payload);
    return {
      manufacturers: manufacturers.data.data,
    }
  }
);

export const searchBrands = createAsyncThunk(
  "dashboard/searchBrands",
  async (payload) => {
    const brands = await manufacturerBrandApi.searchBrands(payload);
    console.log("brands.data.data:", brands.data.data)
    return {
      brands: brands.data.data,
    }
  }
);

export const searchItems = createAsyncThunk(
  "dashboard/searchItems",
  async (payload) => {
    const items = await itemApi.searchByBrandIds(payload);
    console.log("items.data.data:", items.data.data)
    return {
      items: items.data.data,
    }
  }
);

export const searchItem = createAsyncThunk(
  "dashboard/searchItem",
  async (payload) => {
    console.log("dashboard/searchItem payload:", payload)
    const item = await itemApi.search(payload);
    console.log("item.data.data:", item.data.data)
    return {
      item: item.data.data,
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBasicInfo.fulfilled, (state, action) => {
        state.manufacturers = action?.payload?.manufacturers?.sort((a, b) => a.name > b.name ? 1 : -1);
      })
      .addCase(getBasicInfo.rejected, (state, action) => {
        state.manufacturers = []
      })
      .addCase(searchBrands.fulfilled, (state, action) => {
        state.brands = action?.payload?.brands?.sort((a, b) => a.name > b.name ? 1 : -1);
      })
      .addCase(searchBrands.rejected, (state, action) => {
        state.brands = [];
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.items = action?.payload?.items?.sort((a, b) => a.ean > b.ean ? 1 : -1);
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.items = [];
      })
      .addCase(searchItem.fulfilled, (state, action) => {
        state.result = action?.payload?.item?.sort((a, b) => a.ean > b.ean ? 1 : -1);
      })
      .addCase(searchItem.rejected, (state, action) => {
        state.result = [];
      })
  },
});

export default dashboardSlice;