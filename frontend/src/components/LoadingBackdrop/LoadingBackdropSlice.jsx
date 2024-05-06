import { createSlice, isRejected, isPending, isFulfilled } from '@reduxjs/toolkit';

import * as ItemPriceLineChartSlice from '../../pages/Dashboard/ItemPriceLineChartSlice';
import * as FullTableSlice from '../../pages/Dashboard/FullTable/FullTableSlice';
import * as ListToDoItemsSlice from '../../pages/ListToDoItems/ListToDoItemsSlice';


const monitorLoadingThunks = [
  FullTableSlice.getBasicInfo,
  FullTableSlice.searchRecords,
  ItemPriceLineChartSlice.getBasicInfo,
  ItemPriceLineChartSlice.searchBrands,
  ItemPriceLineChartSlice.searchItems,
  ItemPriceLineChartSlice.searchItem,
  ListToDoItemsSlice.searchToDoItems,
  ListToDoItemsSlice.createToDoItem,
  ListToDoItemsSlice.modifyToDoItem,
];

export const LoadingBackdropSlice = createSlice(
  {
    name: 'loadingBackdrop',
    initialState: {
      isLoading: false
    },
    reducers: {
      beginLoading: (state, action) => {
        state.isLoading = true;
      },
      finishLoading: (state, action) => {
        state.isLoading = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(isPending(...monitorLoadingThunks), (state, action) => {
          state.isLoading = true;
        })
        .addMatcher(isFulfilled(...monitorLoadingThunks), (state, action) => {
          state.isLoading = false;
        })
        .addMatcher(isRejected(...monitorLoadingThunks), (state, action) => {
          state.isLoading = false;
        })
    }
  }
);

export default LoadingBackdropSlice;
