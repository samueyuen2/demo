import { configureStore } from '@reduxjs/toolkit';

// App for later
// import AppSlice from '../AppSlice';

// ToDoItems
import ListToDoItemsSlice from '../pages/ListToDoItems/ListToDoItemsSlice';

export const store = configureStore({
    reducer: {
        // app: AppSlice.reducer,
        listToDoItems: ListToDoItemsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: false
});
