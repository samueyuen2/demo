import { configureStore } from '@reduxjs/toolkit';

// Components
import LoadingBackdropSlice from '../components/LoadingBackdrop/LoadingBackdropSlice';

// ToDoItems
import ListToDoItemsSlice from '../pages/ListToDoItems/ListToDoItemsSlice';

// Dashboard
import DashboardSlice from '../pages/Dashboard/DashboardSlice';

export const store = configureStore({
    reducer: {
        loadingBackdrop: LoadingBackdropSlice.reducer,
        listToDoItems: ListToDoItemsSlice.reducer,
        dashboard: DashboardSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: false
});
