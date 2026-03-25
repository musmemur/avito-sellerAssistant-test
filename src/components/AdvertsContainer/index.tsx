import { ItemCard } from "../ItemCard";
import { Pagination } from "antd";
import type { Item } from "../../entities";
import { setPage } from "../../app/slices/advertsSlice";
import {useDispatch} from "react-redux";
import React from "react";

type AdvertsContainerProps = {
    adverts: Item[];
    total: number;
    page: number;
}

export const AdvertsContainer:React.FC<AdvertsContainerProps> = ({adverts, total, page}: AdvertsContainerProps ) => {
    const dispatch = useDispatch();

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    return (
        <div className='flex flex-col gap-[10px] !w-[1155px]'>
            <div className="flex flex-wrap gap-[14px] content-end">
                {adverts.map(ad => (
                    <ItemCard key={ad.id} item={ad} />
                ))}
            </div>

            {total > 10 && (
                <Pagination
                    current={page}
                    total={total}
                    pageSize={10}
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
};