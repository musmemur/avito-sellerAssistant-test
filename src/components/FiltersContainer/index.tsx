import { Checkbox, Divider, Switch } from "antd";
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import {useState} from "react";
import { toggleCategory, setNeedsRevision, resetFilters } from "../../app/slices/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import {translateParameters} from "../../shared/utils/translateParameters.ts";

export const FiltersContainer = () => {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const { categories, needsRevision } = useSelector((state: RootState) => state.filters);
    const allCategories = ['auto', 'electronics', 'real_estate']

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
                        {allCategories.map((category) =>
                            <Checkbox checked={categories.includes(category)}
                                      onChange={() => handleToggleCategory(category)}
                            >
                                <span className='capitalize'>{translateParameters(category)}</span>
                            </Checkbox>
                        )}
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