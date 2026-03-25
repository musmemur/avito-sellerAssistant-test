import { SearchContainer } from "../../components/SearchContainer";
import { FiltersContainer } from "../../components/FiltersContainer";
import { AdvertsContainer } from "../../components/AdvertsContainer";
import {useEffect, useMemo} from "react";
import {resetPage, setAdverts} from "../../app/slices/advertsSlice";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../processes/getItems.ts";
import {resetFilters} from "../../app/slices/filtersSlice.ts";
import type {RootState} from "../../app/store.ts";

export const AdvertsPage = () => {
    const dispatch = useDispatch();
    const { items: adverts, total, page } = useSelector((state: RootState) => state.adverts);
    const filters = useSelector((state: RootState) => state.filters);

    const params = useMemo(() => ({
        limit: 10,
        skip: (page - 1) * 10,
        q: filters.search || undefined,
        needsRevision: filters.needsRevision.toString(),
        categories: filters.categories.length
            ? filters.categories.join(',')
            : undefined,
        sort: filters.sort,
    }), [page, filters]);

    useEffect(() => {
        getItems(params).then(data => {
            dispatch(setAdverts(data));
        });
    }, [dispatch, filters, page, params]);

    useEffect(() => {
        dispatch(resetPage());
    }, [filters, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetFilters());
        }
    }, [dispatch]);

    return (
        <div className='!my-6 !mx-10'>
            <div className="pl-2 !mb-4">
                <h1 className='text-[22px] opacity-85 font-medium'>Мои объявления</h1>
                <div className='text-[18px] text-[var(--text-muted)]'>{total} объявления</div>
            </div>

            <SearchContainer />

            <main className='flex gap-6'>
                <FiltersContainer />
                <AdvertsContainer
                    adverts={adverts}
                    total={total}
                    page={page}
                />
            </main>
        </div>
    );
};