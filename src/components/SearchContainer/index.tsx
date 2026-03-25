import Search from "antd/es/input/Search";
import {Select, Switch} from "antd";
import {useState} from "react";

export const SearchContainer = ({setSearch, setSort}: { setSearch: (v: string) => void; setSort: (v: string) => void; }) => {
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
        <div className='!bg-[var(--bg-components)] flex justify-between items-center gap-6 !p-3 rounded-[8px] !mb-4'>
            <Search
                className='bg-[var(--bg-search)] [&_.ant-input]:!bg-inherit [&_.ant-btn]:!bg-inherit
                [&_.ant-btn]:!border-none [&_.ant-input]:!border-none rounded-[8px]'
                placeholder="Найти объявление..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 958, height: 32 }}
            />
                <Select
                    value={sortValue}
                    onChange={(value) => {
                        setSortValue(value);
                        setSort(value);
                    }}
                    options={options}
                    style={{width: 240}}
                />
        </div>
    )
}