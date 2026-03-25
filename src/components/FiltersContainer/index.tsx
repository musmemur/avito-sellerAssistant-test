import { Checkbox, Divider, Switch } from "antd";
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import { toggleCategory, setNeedsRevision, resetFilters } from "../../app/slices/filtersSlice";
import {useDispatch, useSelector} from "react-redux";

export const FiltersContainer = () => {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const { categories, needsRevision } = useSelector(state => state.filters);

    const handleToggleCategory = (category: string) => {
        dispatch(toggleCategory(category));
    };

    const handleNeedsRevisionChange = (checked: boolean) => {
        dispatch(setNeedsRevision(checked));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <div className='flex flex-col gap-[10px] !w-[256px]'>
            <div className="flex flex-col gap-[10px] !bg-[var(--bg-components)] !p-4">
                <span className='font-medium'>Фильтры</span>

                <div>
                    <button onClick={() => setIsShow(!isShow)} className='w-full flex justify-between'>
                        <span>Категория</span>
                        {isShow ? <UpOutlined className='opacity-85' /> : <DownOutlined className='opacity-85' />}
                    </button>

                    <div className={`${isShow ? 'flex flex-col gap-2 !py-2' : 'hidden'}`}>
                        <Checkbox
                            checked={categories.includes("auto")}
                            onChange={() => handleToggleCategory("auto")}
                        >
                            Авто
                        </Checkbox>

                        <Checkbox
                            checked={categories.includes("electronics")}
                            onChange={() => handleToggleCategory("electronics")}
                        >
                            Электроника
                        </Checkbox>

                        <Checkbox
                            checked={categories.includes("real_estate")}
                            onChange={() => handleToggleCategory("real_estate")}
                        >
                            Недвижимость
                        </Checkbox>
                    </div>
                </div>

                <Divider className='!my-0'/>

                <div className='flex items-center gap-5'>
                    <span className='font-semibold opacity-85'>Только требующие доработок</span>
                    <Switch
                        checked={needsRevision}
                        onChange={handleNeedsRevisionChange}
                    />
                </div>
            </div>

            <button
                className='bg-[var(--bg-components)] !py-3 rounded-[8px] text-[var(--text-muted)]'
                onClick={handleResetFilters}
            >
                Сбросить фильтры
            </button>
        </div>
    );
};