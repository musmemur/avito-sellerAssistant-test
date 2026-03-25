import {Checkbox, Divider, Switch} from "antd";
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import React, {useState} from "react";

type Props = {
    filters: {
        categories: string[];
        needsRevision: boolean;
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

export const FiltersContainer = ({ filters, setFilters }: Props) => {
    const [isShow, setIsShow] = useState(false);

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
        <div className='flex flex-col gap-[10px] !w-[256px]'>
            <div className="flex flex-col gap-[10px] !bg-[var(--bg-components)] !p-4">
                <span className='font-medium'>Фильтры</span>

                <div>
                    <button onClick={() => setIsShow(!isShow)} className='w-full flex justify-between'>
                        <span>Категория</span> {isShow ? <UpOutlined className='opacity-85' /> : <DownOutlined className='opacity-85' />}
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
                <Divider  className='!my-0'/>
                <div className='flex items-center gap-5'>
                    <span className='font-semibold opacity-85'>Только требующие доработок</span>
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
                className='bg-[var(--bg-components)] !py-3 rounded-[8px] text-[var(--text-muted)]'
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