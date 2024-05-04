import { createSlice, isRejected, isPending, isFulfilled } from '@reduxjs/toolkit';

import * as DashboardSlice from '../../pages/Dashboard/DashboardSlice';
import * as ListToDoItemsSlice from '../../pages/ListToDoItems/ListToDoItemsSlice';


const monitorLoadingThunks = [
  DashboardSlice.getBasicInfo,
  DashboardSlice.searchBrands,
  DashboardSlice.searchItems,
  DashboardSlice.searchItem,
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
