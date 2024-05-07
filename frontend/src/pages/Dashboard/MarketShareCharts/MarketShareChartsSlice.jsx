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
  records: [],
  onPromotion: 0,
  notOnPromotion: 0,
  brands_count: [],
  manufacturers_count: [],
  categories_count: [],
  // backgroundColor: (() => {
  //   let result = []
  //   for (let i = 0; i < 100; i++) {
  //     const r = Math.random() * 255
  //     const g = Math.random() * 255
  //     const b = Math.random() * 255
  //     result.push(`rgb(${r}, ${g}, ${b}, 0.75)`)
  //   }
  //   return result
  // })(),
  // borderColor: (() => {
  //   let result = []
  //   for (let i = 0; i < 100; i++) {
  //     const r = Math.random() * 255
  //     const g = Math.random() * 255
  //     const b = Math.random() * 255
  //     result.push(`rgb(${r}, ${g}, ${b})`)
  //   }
  //   return result
  // })(),
};

export const searchRecords = createAsyncThunk(
  "marketShareCharts/searchRecords",
  async (payload) => {
    const records = await itemApi.search(payload);
    console.log(records.data.data)
    return {
      records: records.data.data,
    }
  }
);

export const marketShareChartsSlice = createSlice({
  name: "marketShareCharts",
  initialState,
  reducers: {
    cleanResult: (state, action) => { state.result = {} },
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRecords.fulfilled, (state, action) => {
        // Remove records with the same EAN
        const records = action?.payload?.records.filter((value, index, array) =>
          index === array.findIndex((t) => (t.ean === value.ean))
        )
        state.records = records;

        let onPromotion = 0;
        let notOnPromotion = 0;
        let brands = new Set()
        let manufacturers = new Set()
        let categories = new Set()
        let brands_count = new Map()
        let manufacturers_count = new Map()
        let categories_count = new Map()
        for (const record of records) {
          if (record?.onpromotion) { onPromotion++ } else { notOnPromotion++ }
          if (brands.has(record?.brand?.name)) {
            brands_count.set(record?.brand?.name, brands_count.get(record?.brand?.name) + 1)
          } else {
            brands.add(record?.brand?.name);
            brands_count.set(record?.brand?.name, 1)
          }
          if (manufacturers.has(record?.manufacturer?.name)) {
            manufacturers_count.set(record?.manufacturer?.name, manufacturers_count.get(record?.manufacturer?.name) + 1)
          } else {
            manufacturers.add(record?.manufacturer?.name)
            manufacturers_count.set(record?.manufacturer?.name, 1)
          }
          if (categories.has(record?.category?.name)) {
            categories_count.set(record?.category?.name, categories_count.get(record?.category?.name) + 1)
          } else {
            categories.add(record?.category?.name)
            categories_count.set(record?.category?.name, 1)
          }
        }
        state.onPromotion = ((onPromotion / records?.length) * 100).toFixed(2)
        state.notOnPromotion = ((notOnPromotion / records?.length) * 100).toFixed(2)

        state.brands_count = Array.from(brands_count)?.sort((a, b) => a[1] > b[1] ? -1 : 1);
        state.manufacturers_count = Array.from(manufacturers_count)?.sort((a, b) => a[1] > b[1] ? -1 : 1);
        state.categories_count = Array.from(categories_count)?.sort((a, b) => a[1] > b[1] ? -1 : 1);
      })
      .addCase(searchRecords.rejected, (state, action) => {
        state.records = []
      })
  },
});

export default marketShareChartsSlice;