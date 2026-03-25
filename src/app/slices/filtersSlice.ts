import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type FiltersState = {
    categories: string[];
    needsRevision: boolean;
    search: string;
    sort: string;
};

const initialState: FiltersState = {
    categories: [],
    needsRevision: false,
    search: '',
    sort: 'titleFromStart',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            const exists = state.categories.includes(category);

            if (exists) {
                state.categories = state.categories.filter(c => c !== category);
            } else {
                state.categories.push(category);
            }
        },
        setNeedsRevision: (state, action: PayloadAction<boolean>) => {
            state.needsRevision = action.payload;
        },
        resetFilters: (state) => {
            state.categories = [];
            state.needsRevision = false;
            state.search = '';
            state.sort = 'titleFromStart';
        },
    },
});

export const {
    setSearch,
    setSort,
    toggleCategory,
    setNeedsRevision,
    resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;