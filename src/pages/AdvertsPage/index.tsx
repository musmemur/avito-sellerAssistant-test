import {SearchContainer} from "../../components/SearchContainer";
import {FiltersContainer} from "../../components/FiltersContainer";
import {AdvertsContainer} from "../../components/AdvertsContainer";
import {useEffect, useState} from "react";
import type {Item} from "../../entities";
import {getItems} from "../../processes/getItems.ts";

type Filters = {
    categories: string[];
    needsRevision: boolean;
    search: string;
};

export const AdvertsPage = () => {
    const [adverts, setAdverts] = useState<Item[]>([]);
    const [total, setTotal] = useState(0);

    const [filters, setFilters] = useState<Filters>({
        categories: [],
        needsRevision: false,
        search: "",
    });

    useEffect(() => {
        getItems({
            limit: 10,
            skip: 0,
            q: filters.search || undefined,
            needsRevision: filters.needsRevision.toString(),
            categories: filters.categories.length
                ? filters.categories.join(",")
                : undefined,
        }).then(data => {
            setAdverts(data.items);
            setTotal(data.total);
        });
    }, [filters]);

    return (
        <div className='!my-3 !mx-8'>
            <div className="pl-2 !mb-4">
                <h1 className='text-[22px] opacity-85'>Мои объявления</h1>
                <div className='text-[18px] text-[var(--text-muted)]'>{total} объявления</div>
            </div>

            <SearchContainer setSearch={(value) =>
                setFilters(prev => ({ ...prev, search: value }))
            } />

            <main className='flex gap-6'>
                <FiltersContainer
                    filters={filters}
                    setFilters={setFilters}
                />
                <AdvertsContainer adverts={adverts} />
            </main>
        </div>
    );
};