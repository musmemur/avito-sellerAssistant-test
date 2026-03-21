import {Checkbox, Switch} from "antd";
import {useState} from "react";

export const FiltersContainer = () => {
    const [isShow, setIsShow] = useState<boolean>(true);

    return (
        <div className='flex flex-col gap-[10px] w-150'>
            <div className="flex flex-col gap-[10px] !bg-[var(--bg-components)] !p-4">
                <span>Фильтры</span>
                <div>
                    <button className='self-start' onClick={() => setIsShow(!isShow)}>Категория</button>
                    <div className={`${isShow ? 'flex flex-col gap-2 !py-2' : 'hidden'}`}>
                        <Checkbox>Авто</Checkbox>
                        <Checkbox>Электроника</Checkbox>
                        <Checkbox>Недвижимость</Checkbox>
                    </div>
                </div>
                <div className='flex !items-center gap-5'>
                    <span>Только требующие доработок</span>
                    <Switch/>
                </div>
            </div>
            <button className='bg-[var(--bg-components)] !py-3 rounded-[8px]'>
                Сбросить фильтры
            </button>
        </div>
    )
}