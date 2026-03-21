export const ItemCard = () => {
    return (
        <div className="w-[200px] h-[268px] !bg-[var(--bg-components)]
        border border-[var(--border-neutral)] rounded-[16px]">
            <img src='/src/shared/img/cover.jpg' alt='Card Placeholder' />
            <div className='flex flex-col gap-1 relative !px-4 !py-[22px]'>
                <span className='!px-3 absolute top-[-15px] bg-[var(--bg-components)]
                border border-[var(--border-color)] rounded-[6px]'>
                    Электроника
                </span>
                <span>Наушники</span>
                <span>2990 ₽</span>
                <div className='!py-[2px] !px-2 !bg-[var(--bg-badge)]
                text-[var(--text-badge)] rounded-[8px]'>
                    Требует доработок
                </div>
            </div>
        </div>
    )
}