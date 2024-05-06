import { configureStore } from '@reduxjs/toolkit';

// Components
import LoadingBackdropSlice from '../components/LoadingBackdrop/LoadingBackdropSlice';

// ToDoItems
import ListToDoItemsSlice from '../pages/ListToDoItems/ListToDoItemsSlice';

// Dashboard
import ItemPriceLineChartSlice from '../pages/Dashboard/ItemPriceLineChartSlice';
import FullTableSlice from '../pages/Dashboard/FullTable/FullTableSlice';

export const store = configureStore({
    reducer: {
        loadingBackdrop: LoadingBackdropSlice.reducer,
        listToDoItems: ListToDoItemsSlice.reducer,
        itemPriceLineChart: ItemPriceLineChartSlice.reducer,
        fullTable: FullTableSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: false
});
