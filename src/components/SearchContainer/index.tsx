import Search from "antd/es/input/Search";
import type {SearchProps} from "antd/lib/input";
import {Select, Switch} from "antd";
import {useState} from "react";

export const SearchContainer = () => {
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
        console.log(info?.source, value);

    const [sortValue, setSortValue] = useState<string>('titleFromStart')

    const options = [
        {label: "По названию (А -> Я)", value: "titleFromStart"},
        {label: "По названию (Я -> А)", value: "titleFromEnd"},
        {label: "По новизне (сначала новые)", value: "newStart"},
        {label: "По новизне (сначала старые)", value: "oldStart"},
        {label: "По цене (сначала дешевле)", value: "cheapStart"},
        {label: "По цене (сначала дороже)", value: "expensiveStart"},
    ]

    return (
        <div className='!bg-[var(--bg-components)] flex items-center gap-6 !p-3 rounded-[8px] !mb-4'>
            <Search
                placeholder="Найти объявление..."
                onSearch={onSearch}
                style={{ width: '70%', height: 32 }}
            />
            <div className='flex gap-4 items-center'>
                <Switch />
                <Select value={sortValue}
                        onChange={(e) => setSortValue(e)}
                        options={options}
                        style={{width: 240}}
                />
            </div>
        </div>
    )
}