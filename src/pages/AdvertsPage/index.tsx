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
    sort: string;
};

export const AdvertsPage = () => {
    const [adverts, setAdverts] = useState<Item[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const [filters, setFilters] = useState<Filters>({
        categories: [],
        needsRevision: false,
        search: "",
        sort: "titleFromStart",
    });

    const updateFilters = (newPartial: Partial<Filters>) => {
        setFilters(prev => ({ ...prev, ...newPartial }));
        setPage(1);
    };

    useEffect(() => {
        getItems({
            limit: pageSize,
            skip: (page - 1) * pageSize,
            q: filters.search || undefined,
            needsRevision: filters.needsRevision.toString(),
            categories: filters.categories.length
                ? filters.categories.join(",")
                : undefined,
            sort: filters.sort
        }).then(data => {
            setAdverts(data.items);
            setTotal(data.total);
        });
    }, [filters, page]);

    return (
        <div className='!my-3 !mx-8'>
            <div className="pl-2 !mb-4">
                <h1 className='text-[22px] opacity-85'>Мои объявления</h1>
                <div className='text-[18px] text-[var(--text-muted)]'>{total} объявления</div>
            </div>

            <SearchContainer
                setSearch={(value) =>
                    updateFilters({ search: value })
                }
                setSort={(value) =>
                    updateFilters({ sort: value })
                }
            />

            <main className='flex gap-6'>
                <FiltersContainer
                    filters={filters}
                    setFilters={(newFilters) => {
                        setFilters(newFilters);
                        setPage(1);
                    }}
                />
                <AdvertsContainer
                    adverts={adverts}
                    total={total}
                    page={page}
                    setPage={setPage}
                />
            </main>
        </div>
    );
};