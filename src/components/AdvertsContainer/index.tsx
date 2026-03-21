import {ItemCard} from "../ItemCard";
import {Pagination} from "antd";
import type {Item} from "../../entities";

export const AdvertsContainer = ({adverts}: {adverts: Item[] | []}) => {
    return (
        <div className='flex flex-col gap-[10px]'>
            <div className="flex flex-wrap gap-[14px]">
                {adverts.map(ad => {
                    return <ItemCard key={ad.id} item={ad} />;
                })}
            </div>
            <Pagination defaultCurrent={1} total={50} />
        </div>
    )
}