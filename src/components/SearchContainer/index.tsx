import Search from "antd/es/input/Search";
import { Select } from "antd";
import { setSearch, setSort } from "../../app/slices/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

export const SearchContainer = () => {
    const dispatch = useDispatch();
    const { search, sort } = useSelector(state => state.filters);

    const options = [
        { label: "По названию (А -> Я)", value: "titleFromStart" },
        { label: "По названию (Я -> А)", value: "titleFromEnd" },
        { label: "По новизне (сначала новые)", value: "newStart" },
        { label: "По новизне (сначала старые)", value: "oldStart" },
        { label: "По цене (сначала дешевле)", value: "cheapStart" },
        { label: "По цене (сначала дороже)", value: "expensiveStart" },
    ];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    };

    const handleSortChange = (value: string) => {
        dispatch(setSort(value));
    };

    return (
        <div className='!bg-[var(--bg-components)] flex justify-between items-center gap-6 !p-3 rounded-[8px] !mb-4'>
            <Search
                className='bg-[var(--bg-search)] [&_.ant-input]:!bg-inherit [&_.ant-btn]:!bg-inherit
        [&_.ant-btn]:!border-none [&_.ant-input]:!border-none rounded-[8px]'
                placeholder="Найти объявление..."
                value={search}
                onChange={handleSearchChange}
                style={{ width: 958, height: 32 }}
            />
            <Select
                value={sort}
                onChange={handleSortChange}
                options={options}
                style={{ width: 240 }}
            />
        </div>
    );
};