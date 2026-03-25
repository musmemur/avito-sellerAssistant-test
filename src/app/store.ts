import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';
import advertsReducer from './slices/advertsSlice';

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        adverts: advertsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;