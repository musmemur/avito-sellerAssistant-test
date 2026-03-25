import type {Item} from "../../entities";
import {Link} from "react-router-dom";

export const ItemCard = ({item}: {item: Item}) => {
    const translateCategory = (category: string): string => {
        switch(category) {
            case "auto":
                return "Авто"
            case "real_estate":
                return "Недвижимость"
            case "electronics":
                return "Электроника"
            default:
                return ""
        }
    }

    return (
        <Link to={`./${item.id}`}
            className="w-[200px] h-[268px] !bg-[var(--bg-components)]
        border border-[var(--border-neutral)] rounded-[16px]">
            <img className='rounded-[8px]' src='/src/shared/img/cover.jpg' alt='Card Placeholder' />
            <div className='flex flex-col gap-1 relative !px-4 !py-[22px] items-start'>
                <span className='!px-3 absolute top-[-15px] bg-[var(--bg-components)]
                border border-[var(--border-color)] rounded-[6px]'>
                    {translateCategory(item.category)}
                </span>
                <span className='opacity-85'>{item.title}</span>
                <span className='opacity-45'>{item.price} ₽</span>
                {item.needsRevision ?
                    <div className='!py-[2px] !px-2 !bg-[var(--bg-badge)]
                    text-[var(--text-badge)] rounded-[8px]'>
                        Требует доработок
                    </div> : null}

            </div>
        </Link>
    )
}