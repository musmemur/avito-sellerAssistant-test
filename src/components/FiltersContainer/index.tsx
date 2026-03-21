import {Checkbox, Switch} from "antd";
import React, {useState} from "react";

type Props = {
    filters: {
        categories: string[];
        needsRevision: boolean;
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

export const FiltersContainer = ({ filters, setFilters }: Props) => {
    const [isShow, setIsShow] = useState(true);

    const toggleCategory = (category: string) => {
        setFilters(prev => {
            const exists = prev.categories.includes(category);

            return {
                ...prev,
                categories: exists
                    ? prev.categories.filter((c: string) => c !== category)
                    : [...prev.categories, category],
            };
        });
    };

    return (
        <div className='flex flex-col gap-[10px] w-150'>
            <div className="flex flex-col gap-[10px] !bg-[var(--bg-components)] !p-4">
                <span>Фильтры</span>

                <div>
                    <button onClick={() => setIsShow(!isShow)}>
                        Категория
                    </button>

                    <div className={`${isShow ? 'flex flex-col gap-2 !py-2' : 'hidden'}`}>
                        <Checkbox
                            checked={filters.categories.includes("auto")}
                            onChange={() => toggleCategory("auto")}
                        >
                            Авто
                        </Checkbox>

                        <Checkbox
                            checked={filters.categories.includes("electronics")}
                            onChange={() => toggleCategory("electronics")}
                        >
                            Электроника
                        </Checkbox>

                        <Checkbox
                            checked={filters.categories.includes("real_estate")}
                            onChange={() => toggleCategory("real_estate")}
                        >
                            Недвижимость
                        </Checkbox>
                    </div>
                </div>

                <div className='flex items-center gap-5'>
                    <span>Только требующие доработок</span>
                    <Switch
                        checked={filters.needsRevision}
                        onChange={(checked) =>
                            setFilters(prev => ({
                                ...prev,
                                needsRevision: checked,
                            }))
                        }
                    />
                </div>
            </div>

            <button
                className='bg-[var(--bg-components)] !py-3 rounded-[8px]'
                onClick={() =>
                    setFilters({
                        categories: [],
                        needsRevision: false,
                        search: "",
                    })
                }
            >
                Сбросить фильтры
            </button>
        </div>
    );
};