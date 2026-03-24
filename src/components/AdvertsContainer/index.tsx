import {ItemCard} from "../ItemCard";
import {Pagination} from "antd";
import type {Item} from "../../entities";

export const AdvertsContainer = ({adverts, total, page, setPage}: { adverts: Item[]; total: number; page: number; setPage: (p: number) => void; }) => {
    return (
        <div className='flex flex-col gap-[10px]'>
            <div className="flex flex-wrap gap-[14px]">
                {adverts.map(ad => (
                    <ItemCard key={ad.id} item={ad} />
                ))}
            </div>

            {total !== 0 && (
                <Pagination
                    current={page}
                    total={total}
                    pageSize={10}
                    onChange={(p) => setPage(p)}
                />
            )}
        </div>
    );
};