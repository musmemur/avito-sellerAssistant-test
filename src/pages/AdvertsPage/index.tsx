import {SearchContainer} from "../../components/SearchContainer";
import {FiltersContainer} from "../../components/FiltersContainer";
import {AdvertsContainer} from "../../components/AdvertsContainer";
import {useEffect, useState} from "react";
import type {Item} from "../../entities";
import {getItems} from "../../processes/getItems.ts";

export const AdvertsPage = () => {
    const [adverts, setAdverts] = useState<Item[] | []>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getItems({ limit: 10, skip: 0 })
            .then(data => {
                setAdverts(data.items);
                setTotal(data.total);
            });
    }, []);

    return <>
        <div>
            <div className="pl-2 !mb-4">
                <h1 className='text-[22px] opacity-85'>Мои объявления</h1>
                <div className='text-[18px] text-[var(--text-muted)]'>{total} объявления</div>
            </div>

            <SearchContainer/>

            <main className='flex gap-6'>
                <FiltersContainer />
                <AdvertsContainer adverts={adverts} />
            </main>
        </div>
    </>
}