import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {Item} from '../../entities';

export type AdvertsState = {
    items: Item[];
    total: number;
    page: number;
    pageSize: number;
};

const initialState: AdvertsState = {
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
};

const advertsSlice = createSlice({
    name: 'adverts',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        resetPage: (state) => {
            state.page = 1;
        },
        setAdverts: (state, action: PayloadAction<{items: Item[], total: number}>) => {
            state.items = action.payload.items;
            state.total = action.payload.total;
        },
    },
});

export const { setPage, resetPage, setAdverts } = advertsSlice.actions;

export default advertsSlice.reducer;