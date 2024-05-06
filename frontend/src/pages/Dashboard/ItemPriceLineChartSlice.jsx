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
  items: [{
    "id": "086ea9c4-14e2-44df-85d6-18a8e846070e",
    "date": "2022-02-01",
    "retailerid": "a1448f9a-ec74-4f96-b5d6-be14472c8e9e",
    "ean": "4891028711469",
    "categoryid": "7513f0d4-cef7-4471-94df-98104806bcf7",
    "manufacturerid": "68b1d94a-b653-49d3-b7ff-8ca4849b1790",
    "brandid": "2f209a99-3dec-40f5-8f0a-28a3d5c058e6",
    "producttitle": "Vita Chrysanthemum Tea 250ml",
    "image": "https://s3.eu-central-1.amazonaws.com/bn.production.core-images/4891028711469",
    "onpromotion": false,
    "promotiondesc": null,
    "baseprice": 0.75,
    "shelfprice": 0.75,
    "promotedprice": 0.75
  }],
  result: {},
};

export const getBasicInfo = createAsyncThunk(
  "itemPriceLineChart/getBasicInfo",
  async (payload) => {
    const manufacturers = await manufacturerApi.search(payload);
    return {
      manufacturers: manufacturers.data.data,
    }
  }
);

export const searchBrands = createAsyncThunk(
  "itemPriceLineChart/searchBrands",
  async (payload) => {
    const brands = await manufacturerBrandApi.searchBrands(payload);
    return {
      brands: brands.data.data,
    }
  }
);

export const searchItems = createAsyncThunk(
  "itemPriceLineChart/searchItems",
  async (payload) => {
    const items = await itemApi.searchByBrandIds(payload);
    return {
      items: items.data.data,
    }
  }
);

export const searchItem = createAsyncThunk(
  "itemPriceLineChart/searchItem",
  async (payload) => {
    const item = await itemApi.search(payload);
    return {
      item: item.data.data,
    }
  }
);

export const itemPriceLineChartSlice = createSlice({
  name: "itemPriceLineChart",
  initialState,
  reducers: {
    cleanResult: (state, action) => { state.result = {} },
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
        let result = action?.payload?.item?.sort((a, b) => a.retailer.name > b.retailer.name ? 1 : -1)
        let resultObj = {}
        for (const record of result) {
          if (!resultObj[record?.retailer?.name]) {
            resultObj[record?.retailer?.name] = [record]
          } else {
            resultObj[record?.retailer?.name].push(record)
          }
        }
        let retailerNames = Object.keys(resultObj)
        for (const name of retailerNames) {
          resultObj[name] = resultObj[name]?.sort((a, b) => a.date > b.date ? 1 : -1)
        }
        state.result = resultObj
      })
      .addCase(searchItem.rejected, (state, action) => {
        state.result = [];
      })
  },
});

export default itemPriceLineChartSlice;