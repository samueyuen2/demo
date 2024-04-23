import {
  createAsyncThunk, createSlice,
  isRejected, isPending, isFulfilled,
} from "@reduxjs/toolkit";
import moment from "moment-timezone";
import * as orderApi from "../../api/order";
import * as brandApi from "../../api/brand";
import * as retailerApi from "../../api/retailer";

const initialState = {
  orders: {
    isLoading: true,
    rows: [],
    totalCount: 0,
  },
  brands: [],
  retailers: [],
  totalPackage: 0,
  totalOrder: 0,
  totalSale: 0,
  totalPackage_lw: 0,
  totalOrder_lw: 0,
  totalSale_lw: 0,
};

export const getBasicInfo = createAsyncThunk(
  "dashboard/getBasicInfo",
  async (payload) => {
    const orders = await orderApi.search(payload);
    const brands = await brandApi.search(payload);
    const retailers = await retailerApi.search(payload);
    return {
      orders: orders.data.data,
      brands: brands.data.data,
      retailers: retailers.data.data,
    }
  }
);

//   export const createToDoItem = createAsyncThunk(
//     "dashboard/createToDoItem",
//     async (payload) => {
//       const createRes = await toDoItemsApi.create(payload);
//       const searchrRes = await toDoItemsApi.search();
//       return searchrRes.data
//     }
//   );

//   export const modifyToDoItem = createAsyncThunk(
//     "dashboard/modifyToDoItem",
//     async (payload) => {
//       const modifyRes = await toDoItemsApi.modify(payload);
//       const searchrRes = await toDoItemsApi.search();
//       return searchrRes.data;
//     }
//   );

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getBasicInfo), (state, action) => {
        state.orders.isLoading = true;
      })
      .addMatcher(isFulfilled(getBasicInfo), (state, action) => {
        state.orders.isLoading = false;
        state.orders.rows = action?.payload?.orders
          ?.map((order) => { order.date = moment(order.date)?.startOf('d'); return order; })
          ?.sort((a, b) => { return moment(a.createdAt).valueOf() > moment(b.createdAt).valueOf() ? -1 : 1 })
          ?.sort((a, b) => { return moment(a.date).valueOf() > moment(b.date).valueOf() ? 1 : -1 })
        state.orders.totalCount = action?.payload?.orders.length;

        state.brands = action?.payload?.brands;
        state.retailers = action?.payload?.retailers;

        let twoWeeksBefore = moment()?.startOf('d')?.subtract(2, 'w')?.valueOf()
        let oneWeeksBefore = moment()?.startOf('d')?.subtract(1, 'w')?.valueOf()
        const ourBrandOrder = action?.payload?.orders?.filter((order) => order?.brand?.name == 'Our Brand')
        const lastWeekOrders = ourBrandOrder?.filter((order) => order?.date?.valueOf() >= twoWeeksBefore && order?.date?.valueOf() < oneWeeksBefore)
        const thisWeekOrders = ourBrandOrder?.filter((order) => order?.date?.valueOf() > oneWeeksBefore && order?.date?.valueOf() < moment()?.endOf('d')?.valueOf())
        // console.log(ourBrandOrder)
        // console.log(lastWeekOrders)
        // console.log(thisWeekOrders)

        state.totalPackage = thisWeekOrders?.reduce((sum, current) => sum += current?.packages, 0)
        state.totalPackage_lw = lastWeekOrders?.reduce((sum, current) => sum += current?.packages, 0)
        state.totalOrder = thisWeekOrders?.reduce((sum, current) => sum += 1, 0)
        state.totalOrder_lw = lastWeekOrders?.reduce((sum, current) => sum += 1, 0)
        state.totalSale = Math.ceil(thisWeekOrders?.reduce((sum, current) => sum += (current?.packages * current?.price), 0))
        state.totalSale_lw = Math.ceil(lastWeekOrders?.reduce((sum, current) => sum += (current?.packages * current?.price), 0))
      })
      .addMatcher(isRejected(getBasicInfo), (state, action) => {
        state.orders.isLoading = false;
        state.orders.rows = [];
        state.orders.totalCount = 0;
      })
  },
});

export default dashboardSlice;