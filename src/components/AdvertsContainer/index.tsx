import {ItemCard} from "../ItemCard";
import {Pagination} from "antd";

export const AdvertsContainer = () => {
    return (
        <div className='flex flex-col gap-[10px]'>
            <div className="flex flex-wrap gap-[14px]">
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
            </div>
            <Pagination defaultCurrent={1} total={50} />
        </div>
    )
}