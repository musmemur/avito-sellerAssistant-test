import {SearchContainer} from "../../components/SearchContainer";
import {FiltersContainer} from "../../components/FiltersContainer";
import {AdvertsContainer} from "../../components/AdvertsContainer";

export const AdvertsPage = () => {
    return <>
        <div>
            <div className="pl-2 !mb-4">
                <h1 className='text-[22px] opacity-85'>Мои объявления</h1>
                <div className='text-[18px] text-[var(--text-muted)]'>42 объявления</div>
            </div>

            <SearchContainer/>

            <main className='flex gap-6'>
                <FiltersContainer />
                <AdvertsContainer />
            </main>
        </div>
    </>
}